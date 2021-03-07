import React, { useState, useEffect, useCallback, useContext } from "react";
import SearchCard from "./SearchCard";
import { v4 as uuidv4 } from "uuid";
import debounce from "lodash.debounce";
import { Post } from "../types";
import { Box, Flex, Spinner, Tooltip } from "@chakra-ui/react";
import DataContext from "../context";
import { defaultSourceData } from "../sources";

type RedditFetch = { data: { after: string; children: any[] } };
type RequestOptions = { isDefaultPost: boolean };

const Search: React.FC = () => {
  const data = useContext(DataContext);
  const query = "cats";
  const [options, setOptions] = useState<RequestOptions>({
    isDefaultPost: true,
  });
  const [afterToken, setAfterToken] = useState<string>("");
  const [isLoadingPosts, setIsLoadingPosts] = useState<boolean>(false);
  const [postList, setPostList] = useState<Post[]>([]);

  const fetchPosts = useCallback(
    async (url: string, params: string = "", prevPosts: Post[] = []) => {
      const newPosts = [...prevPosts];
      let aToken = "";
      try {
        const res = await fetch(`${url}${params}`);
        if (res.status === 200) {
          const {
            data: { after: afterT, children },
          }: RedditFetch = await res.json();

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
              ...options,
              ...postInfo,
            });
          });
        }
      } catch (err) {
        console.error(err);
      }

      return { posts: newPosts, after: aToken };
    },
    [options]
  );

  const search = async (
    e: React.FormEvent<HTMLFormElement> | null,
    searchQuery: string
  ) => {
    e?.preventDefault();
    setIsLoadingPosts(true);

    const { posts, after } = await fetchPosts(searchQuery);
    setAfterToken(after);

    setIsLoadingPosts(false);
    setPostList(posts);
    return posts;
  };

  const getMorePosts = useCallback(
    async (
      postsArray: Post[],
      url: string = `https://www.reddit.com/r/${query}.json`
    ) => {
      let newPosts = postsArray;
      try {
        const afterParam = afterToken.length > 0 ? `?after=${afterToken}` : "";

        setIsLoadingPosts(true);

        const { posts, after } = await fetchPosts(url, afterParam, postsArray);
        newPosts = posts;
        setAfterToken(after);

        setIsLoadingPosts(false);
        setPostList(posts);
      } catch {
        console.error("Failed to get more Reddit posts");
      }
      return newPosts;
    },
    [afterToken, fetchPosts]
  );

  useEffect(() => {
    const refreshDebounce = debounce(async () => {
      const subredditExists = query.length > 0;

      // innerHeight is how tall the window is (constant value if window size doesn't change).
      // pageYOffset is how far down the user has scrolled (starts at 0, ends at pageYOffset - innerHeight).
      // offsetHeight is the total height of the page, not just the window height.
      // -2500 is used on the offsetHeight so that it loads before the user hits the bottom.
      const isScrolledToBottomOfPage =
        window.innerHeight + window.pageYOffset >=
        document.body.offsetHeight - 2500;

      if (subredditExists && isScrolledToBottomOfPage) {
        getMorePosts(postList);
      }
    }, 1000);

    document.addEventListener("scroll", refreshDebounce);

    return () => {
      document.removeEventListener("scroll", refreshDebounce);
    };
  }, [getMorePosts, postList, query]);

  useEffect(() => {
    let fiftyMsDelayID: NodeJS.Timeout = setInterval(() => null, 0);
    const timeoutIDs: NodeJS.Timeout[] = [];
    if (data.length === 0) {
      setOptions({ isDefaultPost: true });
      let prevPosts: Post[] = [];
      fiftyMsDelayID = setTimeout(async () => {
        const newPosts = await search(null, defaultSourceData[0].url);
        prevPosts = newPosts;
        defaultSourceData.forEach((source, idx) => {
          idx > 0 &&
            timeoutIDs.push(
              setTimeout(async () => {
                const morePosts = await getMorePosts(prevPosts, source.url);
                prevPosts = morePosts;
              }, idx * 500)
            );
        });
      }, 50);
    } else {
      setOptions({ isDefaultPost: false });
    }

    return () => {
      clearTimeout(fiftyMsDelayID);
      timeoutIDs.forEach((timeout) => clearTimeout(timeout));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const prevPosts = [...postList];
      const updatedPosts = prevPosts.filter(
        (post) => post.isDefaultPost === false
      );
      if (prevPosts.length !== updatedPosts.length) {
        setPostList(updatedPosts);
      }
    }
  }, [data.length, postList]);

  return (
    <Box mb="100px">
      {data.length === 0 && (
        <Flex justify="center" align="center">
          <Tooltip label="Default posts will be removed after you add a source">
            Add a source by tapping the plus in the top right corner! (default
            is r/cats)
          </Tooltip>
        </Flex>
      )}
      <Box my="30px">
        {postList.map((post) => (
          <SearchCard key={post.id} data={post} />
        ))}
      </Box>
      {isLoadingPosts && (
        <Flex justify="center" align="center" my="30px">
          <Spinner size="lg" />
        </Flex>
      )}
    </Box>
  );
};

export default Search;
