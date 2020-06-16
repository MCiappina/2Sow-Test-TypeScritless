import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html {
    height: fit-content;
    font-size: 10px;
  }

  * {
      padding: 0;
      margin: 0;
      font-family: "Roboto", sans-serif;
  }
`;

export default GlobalStyle;
