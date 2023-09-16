import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    :root {
        --bg: #f9f2fa;
        --main: black;
    }

    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-size: 10px;
        -webkit-tap-highlight-color: transparent;
        color: var(--main);
    }

    button {
        background: none;
        border: none;
        outline: none;
    }
    
    input {
        border: none;
        outline: none;
        background: none;

        // Remove arrows from number input
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
    }

    a {
        text-decoration: none;
    }
`;

const GlobalStyles = (): JSX.Element => {
  return <GlobalStyle />;
};

export default GlobalStyles;
