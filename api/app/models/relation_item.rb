class RelationItem < Dynomite::Item
  def create(params = {})
    replace(params)
  end
end
