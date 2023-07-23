import { Global, css } from '@emotion/react'
import theme from '@/styles/theme'

const globalStyles = css`
  :root {
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;

    color-scheme: light dark;

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
  }

  a {
    font-size: inherit;
    color: inherit;
    text-decoration: inherit;
  }

  h1,
  h2,
  h3,
  h4,
  h5 {
    margin: 0;
    padding: 0;
  }

  button {
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: #1a1a1a;
    cursor: pointer;
    transition: border-color 0.25s;
  }
  button:hover {
    border-color: #646cff;
  }
  button:focus,
  button:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
  }

  body {
    margin: 0;
    display: flex;
    place-items: center;
    min-width: 320px;
    min-height: 100vh;
  }

  #ez-paint {
    width: 100%;
  }

  /* ----- 반응형 Mobile 사이즈 ----- */
  ${theme.Response.mobile} {
  }
`

const GlobalStyles = () => <Global styles={globalStyles} />
export default GlobalStyles
