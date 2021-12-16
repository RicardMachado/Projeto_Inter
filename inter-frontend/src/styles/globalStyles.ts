import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    :root{
        --PRIMARY: #FB6910;
        --SECONDARY: #343233;
        --TERTIARY: #E8E8E8;
        --BACKGROUND: #FFF;
        --BACKGROUND2: #FBFCFF;
        --RED: #E72424;
        --GREEN: #15B138;
    }
    
    *{
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }
    
    body{
        font-family: 'Roboto', sans-serif;
        background-color: var(--BACKGROUND);
    }

    input, button, textarea, select {
        font-family: 'Roboto', sans-serif;
    }

    input:focus, textarea:focus, select:focus {
        outline: none;
    }

    a { 
        color: var(--PRIMARY);
        text-decoration: none;
    }

    .primary-color {
        color: var(--PRIMARY);
    }

    .font-bold{
    font-weight: 700;
    }

    .h2{
    font-weight: 500;
    font-size: 1.5rem;
    line-height: 28px;
    color: #000000;
    }

    .wallet {
        font-weight: 500;
        color: var(--PRIMARY);
        font-size: 2.5rem; //40px
        line-height: 47px;
    }
    
`;

export default GlobalStyle;