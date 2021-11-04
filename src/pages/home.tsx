import { Box } from "@chakra-ui/layout"
import * as React from "react"
import { Main } from '../layouts/main'

export const Home = () => (
  <Main>
    <Box bg="red.100" display="grid" gridTemplateColumns="repeat(5, minmax(0, 1fr))" gridGap="12" padding="12" w="full">
        <Box h="md" bgColor="red.400" gridColumn="span 1 / span 1" borderRadius="10" />
        <Box h="md" bgColor="red.400" gridColumn="span 3 / span 3" borderRadius="10" />
        <Box h="md" bgColor="red.400" gridColumn="span 1 / span 1" borderRadius="10"/>
    </Box>
  </Main>
)
