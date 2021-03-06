import React from "react";
import RedditSearch from "./RedditSearch";
import { ChakraProvider, Heading } from "@chakra-ui/react";
import theme from "../theme";

const App: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <Heading textAlign="center" my="40px">
        My Feed
      </Heading>
      <RedditSearch />
    </ChakraProvider>
  );
};

export default App;
