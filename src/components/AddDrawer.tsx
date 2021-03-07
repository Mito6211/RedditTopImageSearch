import React, { useState } from "react";
import { MdAdd } from "react-icons/md";
import {
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
} from "@chakra-ui/react";
import Drawer from "./Drawer";

type Source = "Source" | "Reddit" | "Twitter";
type SourceArray = {
  name: Source;
  url: string;
  textBeforeInput: string | null;
  placeholder: string;
}[];

const sources: SourceArray = [
  {
    name: "Source",
    url: "",
    textBeforeInput: null,
    placeholder: "",
  },
  {
    name: "Reddit",
    url: "https://www.reddit.com/r/{{query}}.json",
    textBeforeInput: "r/",
    placeholder: "Subreddit",
  },
  {
    name: "Twitter",
    url: "https://twitter.com/{{query}}",
    textBeforeInput: null,
    placeholder: "Profile",
  },
];

const AddDrawer: React.FC = () => {
  const [source, setSource] = useState<Source>("Source");
  const [sourceData, setSourceData] = useState<string>("");

  const currentSource = sources.find((s) => s.name === source)!;

  const handleSourceChange = (e: any) => {
    setSource(e.target.value);
  };

  return (
    <Drawer Icon={MdAdd} pos="right" title="Add Content">
      <Select value={source} onChange={handleSourceChange} mb={3}>
        <option>Source</option>
        <option>Reddit</option>
        <option>Twitter</option>
      </Select>
      {currentSource.placeholder.length > 0 && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log({
              source,
              url: currentSource.url.replace("{{query}}", sourceData),
            });
          }}
        >
          <InputGroup mb={3}>
            {currentSource.textBeforeInput !== null && (
              <InputLeftAddon children={currentSource.textBeforeInput} />
            )}
            <Input
              placeholder={currentSource.placeholder}
              value={sourceData}
              onChange={(e) => setSourceData(e.target.value)}
            />
          </InputGroup>
          <Button type="submit" w="100%">
            Add
          </Button>
        </form>
      )}
    </Drawer>
  );
};

export default AddDrawer;
