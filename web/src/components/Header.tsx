import { Flex, Image, Link as SpectrumLink } from "@adobe/react-spectrum"
import React from "react"
import { Link } from "react-router-dom"
import logo from "../logo.svg"

export const Header: React.FC = () => {
  return (
    <Flex direction="row" gap="size-100" alignItems="center" height="100%">
      <Image src={logo} height="100%" alt="logo" />
      <SpectrumLink variant="overBackground">
        <Link to="/">Home</Link>
      </SpectrumLink>
      <SpectrumLink variant="overBackground">
        <Link to="/articles">Articles</Link>
      </SpectrumLink>
    </Flex>
  )
}
