import React, { useState } from "react";
import RedditCard from "./RedditCard";
import { v4 as uuidv4 } from "uuid";

export default function RedditSearch() {
  const [query, setQuery] = useState("");
  const [afterToken, setAfterToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [postList, setPostList] = useState([]);

  const fetchPosts = async (params = "", prevPosts = []) => {
    const newPosts = [...prevPosts];
    try {
      setLoading(true);
      const res = await fetch(
        `https://www.reddit.com/r/${query}.json${params}`
      );
      const {
        data: { after, children },
      } = await res.json();

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
    setLoading(false);

    return newPosts;
  };

  const search = async (e) => {
    e.preventDefault();

    const posts = await fetchPosts();
    setPostList(posts);
  };

  const getMorePosts = async () => {
    const afterParam = afterToken.length > 0 ? `?after=${afterToken}` : "";

    const posts = await fetchPosts(afterParam, postList);
    setPostList(posts);
  };

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
      <button onClick={getMorePosts}>Refresh</button>
      <div className="card-list">
        {loading
          ? "Loading..."
          : postList.map((post) => <RedditCard key={post.id} data={post} />)}
      </div>
    </div>
  );
}
