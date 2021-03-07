import React, { useEffect, useState } from "react";
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
import { MdSettings } from "react-icons/md";
import AddDrawer from "./AddDrawer";

import DataContext from "../context";

const App: React.FC = () => {
  const [isLessThan768px] = useMediaQuery("(max-width: 768px)");
  const { toggleColorMode } = useColorMode();

  const [data, setData] = useState([]);

  useEffect(() => console.log(data), [data]);

  return (
    <DataContext.Provider value={data}>
      <Box maxW="1000px" mx="auto" px={isLessThan768px ? "10px" : "30px"}>
        <Flex justify="space-between" align="center">
          <Drawer Icon={MdSettings} pos="left" title="Settings">
            <Button onClick={toggleColorMode}>Toggle Theme</Button>
          </Drawer>
          <Heading textAlign="center" my="40px">
            My Feed
          </Heading>
          <AddDrawer setData={setData} />
        </Flex>
        <RedditSearch />
      </Box>
    </DataContext.Provider>
  );
};

export default App;
