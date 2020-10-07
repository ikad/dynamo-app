export type Article = {
  id: string
  title: string
  body: string
  status: "created" | "updated" | "deleted"
  revision: number
  created_at: string
  updated_at: string
}
