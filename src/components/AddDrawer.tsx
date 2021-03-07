import React, { useState } from "react";
import { MdAdd } from "react-icons/md";
import {
  Button,
  FormLabel,
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
  textBeforeInput: string;
  label: string;
  placeholder: string;
}[];

const sources: SourceArray = [
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

type Props = {
  setData: React.Dispatch<any>;
};

const AddDrawer: React.FC<Props> = ({ setData }) => {
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
      {currentSource.label.length > 0 && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setData((prev: any) => [
              ...prev,
              currentSource.url.replace("{{query}}", sourceData),
            ]);
          }}
        >
          <FormLabel mb="0.2rem" htmlFor="source-data">
            {currentSource.label}
          </FormLabel>
          <InputGroup id="source-data" mb={3}>
            {currentSource.textBeforeInput.length > 0 && (
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
