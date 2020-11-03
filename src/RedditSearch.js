import React, { useState } from "react";
import RedditCard from "./RedditCard";

export default function RedditSearch() {

    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(undefined);
    const [postList, setPostList] = useState([]);

    const url = `https://www.reddit.com/r/${query}.json`;


    const search = async (e) => {
        e.preventDefault();

        try {
            setLoading(true)
            fetch(url)
                .then(res => res.json())
                .then(posts => {
                    let { children } = posts.data;
                    let postsArray = []

                    children.forEach((child) => {
                        const { title, subreddit_name_prefixed, score, permalink, url, selftext } = child.data;
                        if (selftext.length === 0) {
                            postsArray.push({ title, subreddit_name_prefixed, score, permalink, url });
                        }
                    });
                    setPostList(postsArray);
                    setLoading(false);
                })
        } catch (err) {
            console.error(err);
        }
    }


    return (
        <>
            <h1 className="title">Reddit Top Image Search</h1>

            <div className="container">

                <form className="form" onSubmit={search}>
                    <label className="label" htmlFor="query">Subreddit - r/</label>
                    <input className="input" type="text" name="query"
                        placeholder="i.e. programmerhumor"
                        value={query} onChange={(e) => setQuery(e.target.value)}
                    />
                    <button className="button" type="submit">Search</button>
                </form>
                <div className="card-list">
                    {loading === true ? 'Loading...' : postList.map(post => <RedditCard key={post.score} data={post} />)}
                </div>

            </div>
        </>
    )
}