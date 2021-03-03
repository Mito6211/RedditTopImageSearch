import React from "react";
import { Post } from "../types";
import { Box, Link, Text, Image, useMediaQuery } from "@chakra-ui/react";

type Props = {
  data: Post;
};
const RedditCard: React.FC<Props> = ({
  data: { title, subreddit_name_prefixed, score, permalink, url },
}) => {
  const [isLessThan768px] = useMediaQuery("(max-width: 768px)");
  const isRedditLink = /https:\/\/i\.redd.it\/.+\.(jpg|gif|png)/.test(url);

  return (
    <>
      {isRedditLink && (
        <Box
          px={isLessThan768px ? "2rem" : "4rem"}
          py="2rem"
          mb="2rem"
          borderRadius="10px"
          boxShadow="1px 1px 5px rgba(0, 0, 0, 0.25);"
          bgColor="white"
        >
          <Text fontSize="sm">
            {score} - {subreddit_name_prefixed}
          </Text>
          <Box>
            <Link
              href={`https://www.reddit.com${permalink}`}
              target="_blank"
              rel="noreferrer noopener"
              fontSize="xl"
            >
              {title}
            </Link>
          </Box>
          <Image
            m="auto"
            w={isLessThan768px ? "100%" : "70%"}
            src={url}
            alt={title}
          />
        </Box>
      )}
    </>
  );
};

export default RedditCard;
