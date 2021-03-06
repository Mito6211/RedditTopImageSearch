import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { ColorModeScript } from "@chakra-ui/color-mode";
import theme from "./theme";

ReactDOM.render(
  <>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <App />
  </>,
  document.getElementById("root")
);
