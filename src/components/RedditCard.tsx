import React, { useState } from "react";
import { Post } from "../types";
import {
  Box,
  Link,
  Text,
  Image,
  useMediaQuery,
  Skeleton,
} from "@chakra-ui/react";

type Props = {
  data: Post;
};
const RedditCard: React.FC<Props> = ({
  data: { title, subreddit_name_prefixed, score, permalink, url },
}) => {
  const [isLessThan768px] = useMediaQuery("(max-width: 768px)");
  const isRedditLink = /https:\/\/i\.redd.it\/.+\.(jpg|gif|png)/.test(url);

  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);

  return (
    <>
      {isRedditLink && (
        <Box
          px={isLessThan768px ? "2rem" : "4rem"}
          py="2rem"
          mx="auto"
          my="1rem"
          maxW="726px"
          borderRadius="10px"
          boxShadow="1px 1px 5px rgba(0, 0, 0, 0.25);"
        >
          <Text fontSize="sm">
            {subreddit_name_prefixed} - {score}
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
          <Skeleton isLoaded={isImageLoaded} minH={isImageLoaded ? 0 : "500px"}>
            <Image
              m="15px auto"
              w="100%"
              src={url}
              alt={title}
              onLoad={() => setIsImageLoaded(true)}
            />
          </Skeleton>
        </Box>
      )}
    </>
  );
};

export default RedditCard;
