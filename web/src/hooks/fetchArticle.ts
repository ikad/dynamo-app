import { Article } from "./Article"

export const fetchArticle = async (id: string) => {
  const res: Article = await (await fetch(`http://localhost:3000/articles/${id}`)).json()
  return res
}
