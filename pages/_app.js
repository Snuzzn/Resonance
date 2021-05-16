import "../styles/globals.css";
import { ThemeProvider } from "@material-ui/core";
import theme from "../styles/theme";
import React from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ToastProvider } from "react-toast-notifications";

function MyApp({ Component, pageProps }) {
  const [darkMode, setDarkMode] = React.useState(true);
  const theme = createMuiTheme({
    overrides: {
      MuiCssBaseline: {
        "@global": {
          "html::-webkit-scrollbar": {
            width: "0.5rem",
          },

          "html::-webkit-scrollbar-thumb": {
            background: darkMode ? "#1A2640" : "#C8CBCF",
          },

          "html::-webkit-scrollbar-track": {
            background: darkMode ? "#2a3456" : "#f2f4f6",
          },
          html: {
            scrollbarWidth: "thin",
            scrollbarColor: darkMode ? "#1A2640 #2a3456" : "#C8CBCF #f2f4f6",
          },
        },
      },
    },
    breakpoints: {
      values: {
        xs: 0,
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
      <ToastProvider>
        <Component
          {...pageProps}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
      </ToastProvider>
    </ThemeProvider>
  );
}

export default MyApp;
