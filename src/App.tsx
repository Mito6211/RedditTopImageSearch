import React from "react";
import "./main.css";
import RedditSearch from "./RedditSearch";

const App: React.FC = () => {
  return (
    <>
      <h1 className="title">Reddit Top Image Search</h1>
      <RedditSearch />
    </>
  );
};

export default App;
