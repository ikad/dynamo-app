import { Article } from "./Article"

export const fetchArticles = async () => {
  const res: Article[] = await (await fetch("http://localhost:3000/articles")).json()
  return res
}
