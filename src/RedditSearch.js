import React, { useState, useEffect, useCallback } from "react";
import RedditCard from "./RedditCard";
import { v4 as uuidv4 } from "uuid";
import debounce from "lodash.debounce";

export default function RedditSearch() {
  const [query, setQuery] = useState("");
  const [afterToken, setAfterToken] = useState("");
  const [isLoadingInitialPosts, setIsLoadingInitialPosts] = useState(false);
  const [isLoadingAdditionalPosts, setIsLoadingAdditionalPosts] = useState(
    false
  );
  const [postList, setPostList] = useState([]);

  const fetchPosts = useCallback(
    async (params = "", prevPosts = []) => {
      const newPosts = [...prevPosts];
      try {
        const res = await fetch(
          `https://www.reddit.com/r/${query}.json${params}`
        );
        const {
          data: { after, children },
        } = await res.json();
        console.log(after);
        setAfterToken(after);

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

      return newPosts;
    },
    [query]
  );

  const search = async (e) => {
    e.preventDefault();

    setIsLoadingInitialPosts(true);
    const posts = await fetchPosts();
    setIsLoadingInitialPosts(false);

    setPostList(posts);
  };

  const getMorePosts = useCallback(async () => {
    try {
      const afterParam = afterToken.length > 0 ? `?after=${afterToken}` : "";

      setIsLoadingAdditionalPosts(true);
      const posts = await fetchPosts(afterParam, postList);
      setIsLoadingAdditionalPosts(false);
      setPostList(posts);
    } catch {
      console.error("Failed to get more posts");
    }
  }, [afterToken, fetchPosts, postList]);

  useEffect(() => {
    const refreshDebounce = debounce(async (e) => {
      const subredditExists = query.length > 0;

      // innerHeight is how tall the window is (constant value if window size doesn't change).
      // pageYOffset is how far down the user has scrolled (starts at 0, ends at pageYOffset - innerHeight).
      // offsetHeight is the total height of the page, not just the window height.
      const isScrolledToBottomOfPage =
        window.innerHeight + window.pageYOffset >= document.body.offsetHeight;

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
