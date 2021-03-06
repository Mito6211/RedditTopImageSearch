import { ColorModeScript } from "@chakra-ui/color-mode";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import theme from "./theme";

ReactDOM.render(
  <>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <App />
  </>,
  document.getElementById("root")
);
