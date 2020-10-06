class Comment < SimpleItem
  table_name :blog
  column :id, :body

  def create(params = {}, article_id = '')
    comment = super(params)
    article = Article.find(article_id)
    ArticleComment.new.create({ id: article.id, sk: comment['id'] })
  end
end
