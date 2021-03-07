import { Source } from "./types";

type SourceArray = {
  name: Source;
  url: string;
  textBeforeInput: string;
  label: string;
  placeholder: string;
}[];

export const sources: SourceArray = [
  {
    name: "Source",
    url: "",
    textBeforeInput: "",
    label: "",
    placeholder: "",
  },
  {
    name: "Reddit",
    url: "https://www.reddit.com/r/{{query}}.json",
    textBeforeInput: "r/",
    label: "Subreddit",
    placeholder: "cats",
  },
  {
    name: "Twitter",
    url: "https://twitter.com/{{query}}",
    textBeforeInput: "@",
    label: "Profile Name",
    placeholder: "elonmusk",
  },
];
