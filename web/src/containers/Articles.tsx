import React, { useState } from "react"
import { useQuery } from "react-query"
import { NowLoading } from "../components/NowLoading"
import { fetchArticles } from "../hooks/fetchArticles"
import { Error } from "../components/Error"
import { ArticleTable } from "../components/AtricleTable"
import { Content, Flex, Heading, ToggleButton, View } from "@adobe/react-spectrum"

export const Articles: React.FC = () => {
  const { isLoading, error, data } = useQuery("articlesData", fetchArticles)
  const [showAll, toggleShow] = useState(false)

  return (
    <View>
      <Flex direction="column" gap="size-125">
        <Flex direction="row" justifyContent="space-between" alignItems="center">
          <Heading>Articles</Heading>
          <ToggleButton isSelected={showAll} onChange={toggleShow}>
            {showAll ? "hide Deleted" : "show Deleted"}
          </ToggleButton>
        </Flex>

        <Content>
          {isLoading && <NowLoading />}
          {error && <Error />}
          {data && <ArticleTable articles={data.filter((c) => showAll || c.status !== "deleted")} />}
        </Content>
      </Flex>
    </View>
  )
}
