import { createTheme } from "@mui/material";
import { blue, cyan, grey } from "@mui/material/colors";

export const LightTheme = createTheme({
  palette: {
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
        default: "#f7f6f3",
        paper: "#ffffff",
    }
  },
});
