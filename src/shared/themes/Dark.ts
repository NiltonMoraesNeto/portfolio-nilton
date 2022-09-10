import { createTheme } from "@mui/material";
import { cyan, grey } from "@mui/material/colors";

export const DarkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: cyan[700],
      dark: cyan[800],
      light: cyan[500],
      contrastText: "#ffffff",
    },
    secondary: {
      main: grey[500],
      dark: grey[400],
      light: grey[300],
      contrastText: "#ffffff",
    },
    background:{
        default: "#001e3c",
        paper: "#0a1929",
    },
  },
  typography: {
    allVariants:{
      color: "white"
    }
  }
});
