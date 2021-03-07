import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  styles: {
    global: (props) => ({
      "body::-webkit-scrollbar": {
        width: "1em",
      },

      "body::-webkit-scrollbar-track": {
        boxShadow: "inset 0 0 2px rgba(0, 0, 0, 0.3)",
      },

      "body::-webkit-scrollbar-thumb": {
        background:
          props.colorMode === "light"
            ? "rgb(52, 64, 88)"
            : "rgba(255, 255, 255, 0.92)",
        outline: "1px solid slategrey",
      },
    }),
  },
});

export default theme;
