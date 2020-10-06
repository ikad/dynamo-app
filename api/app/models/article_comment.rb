class ArticleComment < RelationItem
  table_name :blog
  column :id, :article_id
end
