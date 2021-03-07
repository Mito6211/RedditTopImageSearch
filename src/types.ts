export type Post = {
  id?: string;
  isDefaultPost: boolean;
  permalink: string;
  score: number;
  subreddit_name_prefixed: string;
  title: string;
  url: string;
};

export type Source = "Source" | "Reddit" | "Twitter";
