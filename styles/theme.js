import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// Create a theme instance.
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
    type: "dark",
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
  },
});

export default theme;
