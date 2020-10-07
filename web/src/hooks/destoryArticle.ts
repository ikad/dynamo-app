export const destroyArticles = async (id: string) => {
  return await fetch(`http://localhost:3000/articles/${id}`, { method: "DELETE", mode: "cors" })
}
