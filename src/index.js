import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import App from "./App";
import GlobalStyle from "./styled/globalStyles";
import Theme from "./styled/theme";

const root = document.getElementById("root");

ReactDOM.render(
  <ThemeProvider theme={Theme}>
    <BrowserRouter>
      <GlobalStyle />
      <App />
    </BrowserRouter>
  </ThemeProvider>,
  root
);
