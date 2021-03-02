import React, { useState } from "react";
import RedditCard from "./RedditCard";
import { v4 as uuidv4 } from "uuid";

export default function RedditSearch() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [postList, setPostList] = useState([]);

  const search = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await fetch(`https://www.reddit.com/r/${query}.json`);
      const {
        data: { children },
      } = await res.json();

      let postsArray = [];

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
          postsArray.push({
            id: uuidv4(),
            title,
            subreddit_name_prefixed,
            score,
            permalink,
            url,
          });
        }
      });

      setPostList(postsArray);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
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
      <div className="card-list">
        {loading
          ? "Loading..."
          : postList.map((post) => <RedditCard key={post.id} data={post} />)}
      </div>
    </div>
  );
}
