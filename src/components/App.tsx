import React from "react";
import RedditSearch from "./RedditSearch";
import Drawer from "./Drawer";
import {
  Box,
  Flex,
  Heading,
  useMediaQuery,
  Button,
  useColorMode,
} from "@chakra-ui/react";
import { MdAdd, MdSettings } from "react-icons/md";

const App: React.FC = () => {
  const [isLessThan768px] = useMediaQuery("(max-width: 768px)");
  const { toggleColorMode } = useColorMode();

  return (
    <Box maxW="1000px" mx="auto" px={isLessThan768px ? "10px" : "30px"}>
      <Flex justify="space-between" align="center">
        <Drawer Icon={MdSettings} pos="left" title="Settings">
          <Button onClick={toggleColorMode}>Toggle Theme</Button>
        </Drawer>
        <Heading textAlign="center" my="40px">
          My Feed
        </Heading>
        <Drawer Icon={MdAdd} pos="right" title="Add Content">
          Placeholder Text
        </Drawer>
      </Flex>
      <RedditSearch />
    </Box>
  );
};

export default App;
