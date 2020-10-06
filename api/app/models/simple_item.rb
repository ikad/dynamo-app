class SimpleItem < Dynomite::Item
  class << self
    def find(id)
      if id.instance_of?(String) && sort_key
        super({ partition_key => id, sort_key => 'v_0' })
      else
        super(id)
      end
    end

    def sort_key
      range = table.key_schema.find { |e| e.key_type == 'RANGE' }
      range&.attribute_name
    end
  end

  def create(params = {})
    created = replace(default_params.merge(params).merge(revision_params(params[self.class.partition_key])))
    (current || self.class).replace(created.attrs.merge(current_sort_key(created)))
  end

  def update(params = {})
    params[:created_at] = nil
    params[:status] = 'updated'
    create(params.with_indifferent_access)
  end

  def destroy(params = {})
    params[:created_at] = nil
    params[:status] = 'deleted'
    create(params.with_indifferent_access)
  end

  private

  def current_pk
    attrs.fetch(self.class.partition_key.to_sym, nil)
  end

  def current
    id = current_pk
    find(id) if id.present?
  end

  def current_sort_key(item)
    { self.class.sort_key => 'v_0' }.with_indifferent_access
  end

  def default_params
    pk = (current_pk || [self.class.name, Digest::SHA1.hexdigest([Time.now, rand].join)].join('-'))
    @default_params ||= {
      self.class.partition_key => pk,
      status: 'created',
    }.with_indifferent_access
  end

  def revision_params(partition_key)
    current_revision = current&.attrs&.fetch('revision') || 0
    new_revision = (current_revision + 1).to_i
    sk_partition_key = partition_key || default_params[self.class.partition_key]
    @revision_params ||= {
      self.class.sort_key => "v_#{new_revision}_#{sk_partition_key}",
      revision: new_revision,
    }.with_indifferent_access
  end
end
