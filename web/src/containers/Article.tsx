import { Heading, View, Text, Flex, Content } from "@adobe/react-spectrum"
import { Link as SpectrumLink } from "@adobe/react-spectrum"
import React from "react"
import { useQuery } from "react-query"
import { Link, useParams } from "react-router-dom"
import { Error } from "../components/Error"
import { NowLoading } from "../components/NowLoading"
import { fetchArticle } from "../hooks/fetchArticle"

export const Article: React.FC = () => {
  const params: any = useParams()
  const { isLoading, error, data } = useQuery(["articleData", params.id], () => fetchArticle(params.id))

  return (
    <View>
      <SpectrumLink>
        <Link to="/articles">Back</Link>
      </SpectrumLink>

      <Flex direction="column" gap="size-125">
        <Heading>{data && data.title}</Heading>
        <Content>
          {isLoading && <NowLoading />}
          {error && <Error />}
          <Text>{data && data.body}</Text>
        </Content>
        <Text>{data && data.created_at}</Text>
      </Flex>
    </View>
  )
}
