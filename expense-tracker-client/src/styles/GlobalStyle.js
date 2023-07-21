import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`*
{
    margin: 0;
    padding: 0;
    box-sizing: border-box; 
    list-style: none;
}

:root {
    --primary-color: rgba(34, 34, 96, 1);
    --primary-color2: rgba(34, 34, 96, .6);
    --primary-color3: rgba(34, 34, 96, .4);
    --color-blue: #95BDFF;
    --color-grey: #aaa;
    --color-accent: #FD8A8A;
    --color-delete: #FF0000;
}

body {
    font-family: 'Source Code Pro', sans-serif; 
    font-size: clamp(1rem, 1.5vw, 1.2rem);
    overflow: hidden;
    color: rgba(34, 34, 96, .6)';

}

button {
    font-family: 'Source Code Pro', sans-serif; 
    font-size: clamp(1rem, 1.5vw, 1.2rem);
    background: var(--color-accent);
    padding: .3rem .8rem;
    border-radius: 10px;
    color: #;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    &:hover {
        background: var(--color-blue);
    }
}

button:hover {
    transform: scale(1.25);
  }

h1, h2, h3, h4, h5, h6 {
    color: var(--color-primary);
}

`;
