import React from "react";
import RedditSearch from "./RedditSearch";
import { ChakraProvider, Heading } from "@chakra-ui/react";

const App: React.FC = () => {
  return (
    <ChakraProvider>
      <Heading textAlign="center" my="40px" className="title">
        Reddit Top Image Search
      </Heading>
      <RedditSearch />
    </ChakraProvider>
  );
};

export default App;
