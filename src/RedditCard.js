import React from "react";

const RedditCard = ({ data }) => {
  const { title, subreddit_name_prefixed, score, permalink, url } = data;
  const isRedditLink = /https:\/\/i\.redd.it\/.+\.(jpg|gif|png)/.test(url);

  return (
    <>
      {isRedditLink && (
        <div className="card">
          <small>
            {score} - {subreddit_name_prefixed}
          </small>
          <h3>
            <a
              href={`https://www.reddit.com${permalink}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              {title}
            </a>
          </h3>
          <img className="card--image" src={url} alt={title} />
        </div>
      )}
    </>
  );
};

export default RedditCard;
