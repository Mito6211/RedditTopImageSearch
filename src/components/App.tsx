import React from "react";
import RedditSearch from "./RedditSearch";
import SettingsDrawer from "./SettingsDrawer";
import {
  Box,
  ChakraProvider,
  Flex,
  Heading,
  useMediaQuery,
} from "@chakra-ui/react";
import theme from "../theme";
import AddDrawer from "./AddDrawer";

const App: React.FC = () => {
  const [isLessThan768px] = useMediaQuery("(max-width: 768px)");

  return (
    <ChakraProvider theme={theme}>
      <Box maxW="1000px" mx="auto" px={isLessThan768px ? "10px" : "30px"}>
        <Flex justify="space-between" align="center">
          <SettingsDrawer />
          <Heading textAlign="center" my="40px">
            My Feed
          </Heading>
          <AddDrawer />
        </Flex>
        <RedditSearch />
      </Box>
    </ChakraProvider>
  );
};

export default App;
