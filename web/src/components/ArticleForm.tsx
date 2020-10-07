import React from "react"

export const ArticleFrom: React.FC = () => {
  return (
    <form>
      <input name="title" />
      <input name="body" />
      <button type="submit">OK</button>
    </form>
  )
}
