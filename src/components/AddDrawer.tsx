import React, { useState } from "react";
import { MdAdd } from "react-icons/md";
import { Input, InputGroup, InputLeftAddon, Select } from "@chakra-ui/react";
import Drawer from "./Drawer";

type Source = "Source" | "Reddit" | "Twitter";
type SourceArray = {
  name: Source;
  textBeforeInput: string | null;
  placeholder: string;
}[];

const sources: SourceArray = [
  {
    name: "Source",
    textBeforeInput: null,
    placeholder: "",
  },
  {
    name: "Reddit",
    textBeforeInput: "r/",
    placeholder: "Subreddit",
  },
  {
    name: "Twitter",
    textBeforeInput: null,
    placeholder: "Profile",
  },
];

const AddDrawer: React.FC = () => {
  const [source, setSource] = useState<Source>("Source");
  const [sourceData, setSourceData] = useState<string>("");

  const currentSource = sources.find((s) => s.name === source)!;
  console.log(currentSource);

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
        <InputGroup>
          {currentSource.textBeforeInput !== null && (
            <InputLeftAddon children={currentSource.textBeforeInput} />
          )}
          <Input
            placeholder={currentSource.placeholder}
            value={sourceData}
            onChange={(e) => setSourceData(e.target.value)}
          />
        </InputGroup>
      )}
    </Drawer>
  );
};

export default AddDrawer;
