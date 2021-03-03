import React, { useState, useEffect, useCallback } from "react";
import RedditCard from "./RedditCard";
import { v4 as uuidv4 } from "uuid";
import debounce from "lodash.debounce";
import { Post } from "./types";

export default function RedditSearch() {
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
            selftext,
          } = child.data;

          if (selftext.length === 0) {
            newPosts.push({
              id: uuidv4(),
              title,
              subreddit_name_prefixed,
              score,
              permalink,
              url,
            });
          }
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
      // -500 is used on the offsetHeight so that it loads before the user hits the bottom.
      const isScrolledToBottomOfPage =
        window.innerHeight + window.pageYOffset >=
        document.body.offsetHeight - 500;

      if (subredditExists && isScrolledToBottomOfPage) {
        getMorePosts();
      }
    }, 1000);

    document.addEventListener("scroll", refreshDebounce);

    return () => {
      document.removeEventListener("scroll", refreshDebounce);
    };
  }, [getMorePosts, query]);

  return (
    <div className="container">
      <form className="form" onSubmit={search}>
        <label className="label" htmlFor="query">
          Subreddit - r/
        </label>
        <input
          className="input"
          type="text"
          name="query"
          placeholder="i.e. memes"
          autoComplete="off"
          value={query}
          onChange={({ target: { value } }) => setQuery(value)}
        />
        <button className="button" type="submit">
          Search
        </button>
      </form>
      <div className="card-list">
        {isLoadingInitialPosts
          ? "Loading..."
          : postList.map((post) => <RedditCard key={post.id} data={post} />)}
        {isLoadingAdditionalPosts && "Loading More Posts..."}
      </div>
    </div>
  );
}
