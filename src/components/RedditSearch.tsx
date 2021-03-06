import React, { useState, useEffect, useCallback } from "react";
import RedditCard from "./RedditCard";
import { v4 as uuidv4 } from "uuid";
import debounce from "lodash.debounce";
import { Post } from "../types";
import {
  Button,
  Box,
  Flex,
  FormControl,
  FormLabel,
  InputLeftAddon,
  InputRightAddon,
  InputGroup,
  Input,
  Spinner,
  useMediaQuery,
  useColorMode,
} from "@chakra-ui/react";

export default function RedditSearch() {
  const [isLessThan768px] = useMediaQuery("(max-width: 768px)");

  const [query, setQuery] = useState<string>("");
  const [afterToken, setAfterToken] = useState<string>("");
  const [isLoadingInitialPosts, setIsLoadingInitialPosts] = useState<boolean>(
    false
  );
  const [
    isLoadingAdditionalPosts,
    setIsLoadingAdditionalPosts,
  ] = useState<boolean>(false);
  const [postList, setPostList] = useState<Post[]>([]);

  const fetchPosts = useCallback(
    async (subreddit: string, params: string = "", prevPosts: Post[] = []) => {
      const newPosts = [...prevPosts];
      let aToken = "";
      try {
        const res = await fetch(
          `https://www.reddit.com/r/${subreddit}.json${params}`
        );
        const {
          data: { after: afterT, children },
        }: { data: { after: string; children: any[] } } = await res.json();

        aToken = afterT;

        children.forEach((child) => {
          const {
            title,
            subreddit_name_prefixed,
            score,
            permalink,
            url,
          } = child.data;

          const postInfo = {
            title,
            subreddit_name_prefixed,
            score,
            permalink,
            url,
          };

          newPosts.push({
            id: uuidv4(),
            ...postInfo,
          });
        });
      } catch (err) {
        console.error(err);
      }

      return { posts: newPosts, after: aToken };
    },
    []
  );

  const search = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoadingInitialPosts(true);

    const { posts, after } = await fetchPosts(query);
    setAfterToken(after);

    setIsLoadingInitialPosts(false);
    setPostList(posts);
  };

  const getMorePosts = useCallback(async () => {
    try {
      const afterParam = afterToken.length > 0 ? `?after=${afterToken}` : "";

      setIsLoadingAdditionalPosts(true);

      const { posts, after } = await fetchPosts(query, afterParam, postList);
      setAfterToken(after);

      setIsLoadingAdditionalPosts(false);
      setPostList(posts);
    } catch {
      console.error("Failed to get more posts");
    }
  }, [afterToken, fetchPosts, postList, query]);

  useEffect(() => {
    const refreshDebounce = debounce(async () => {
      const subredditExists = query.length > 0;

      // innerHeight is how tall the window is (constant value if window size doesn't change).
      // pageYOffset is how far down the user has scrolled (starts at 0, ends at pageYOffset - innerHeight).
      // offsetHeight is the total height of the page, not just the window height.
      // -800 is used on the offsetHeight so that it loads before the user hits the bottom.
      const isScrolledToBottomOfPage =
        window.innerHeight + window.pageYOffset >=
        document.body.offsetHeight - 800;

      if (subredditExists && isScrolledToBottomOfPage) {
        getMorePosts();
      }
    }, 1000);

    document.addEventListener("scroll", refreshDebounce);

    return () => {
      document.removeEventListener("scroll", refreshDebounce);
    };
  }, [getMorePosts, query]);

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      maxW="1000px"
      mx="auto"
      mb="200px"
      px={isLessThan768px ? "10px" : "40px"}
    >
      <Button onClick={toggleColorMode}>
        Toggle {colorMode === "light" ? "Dark" : "Light"}
      </Button>
      <form onSubmit={search}>
        <FormControl>
          <FormLabel mb="0.2rem" htmlFor="query">
            Subreddit
          </FormLabel>
          <InputGroup>
            <InputLeftAddon children="r/" />
            <Input
              mb="1rem"
              lineHeight="2.5rem"
              type="text"
              name="query"
              placeholder="cats"
              autoComplete="off"
              value={query}
              onChange={({ target: { value } }) => setQuery(value)}
            />
            <InputRightAddon p="0px">
              <Button h="40px" type="submit">
                Search
              </Button>
            </InputRightAddon>
          </InputGroup>
        </FormControl>
      </form>
      <Box mt="30px">
        {isLoadingInitialPosts ? (
          <Flex align="center" justify="center">
            <Spinner />
          </Flex>
        ) : (
          postList.map((post) => <RedditCard key={post.id} data={post} />)
        )}
        {isLoadingAdditionalPosts && (
          <Flex align="center" justify="center">
            <Spinner />
          </Flex>
        )}
      </Box>
    </Box>
  );
}
