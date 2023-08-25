import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Form from "./components/Form";

const theme = createTheme({
  palette: {
    primary: {
      main: "#361754",
    },
    secondary: {
      main: "#fbcc34",
    },
  },
  typography: {
    fontFamily: [
      "Poppins",
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Form />
    </ThemeProvider>
  );
};

export default App;
