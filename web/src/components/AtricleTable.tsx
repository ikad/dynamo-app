import React from "react"
import { Link } from "react-router-dom"
import { Link as SpectrumLink } from "@adobe/react-spectrum"
import { Article } from "../hooks/Article"

type props = {
  articles: Article[]
}

export const ArticleTable: React.FC<props> = ({ articles }) => {
  return (
    <table>
      <thead>
        <tr>
          <td>id</td>
          <td>title</td>
          <td>updated_at</td>
        </tr>
      </thead>
      <tbody>
        {articles.map((c) => (
          <tr key={c.id}>
            <td>
              <SpectrumLink variant="overBackground">
                <Link to={`/articles/${c.id}`}>{c.id}</Link>
              </SpectrumLink>
            </td>
            <td>{c.status !== "deleted" && c.title}</td>
            <td>{c.status !== "deleted" && c.updated_at}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
