import "../styles/globals.css";
import { ThemeProvider } from "@material-ui/core";
import theme from "../styles/theme";
import React from "react";
import { createMuiTheme } from "@material-ui/core/styles";

function MyApp({ Component, pageProps }) {
  const [darkMode, setDarkMode] = React.useState(true);
  const theme = createMuiTheme({
    breakpoints: {
      values: {
        _xs: 0,
        _sm: 600,
        _md: 960,
        _lg: 1280,
        _xl: 1920,
        _xxl: 2000,
      },
    },
    palette: {
      type: darkMode ? "dark" : "light",
      primary: {
        main: darkMode ? "#7967ff" : "#556cd6",
      },
      secondary: {
        main: "#19857b",
      },

      background: {
        default: darkMode ? "#37466F" : "#fff",
        paper: darkMode ? "#2A3456" : "#fff",
      },
      sidebar: darkMode ? "#2A3456" : "#F2F4F6",
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} darkMode={darkMode} setDarkMode={setDarkMode} />
    </ThemeProvider>
  );
}

export default MyApp;
