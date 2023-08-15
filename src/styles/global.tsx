import { Global, css } from '@emotion/react'
import theme from '@/styles/theme'

const globalStyles = css`
  :root {
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;

    /* color-scheme: light dark; */

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
  }

  a {
    box-sizing: border-box;
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
  body {
    margin: 0;
    display: flex;
    place-items: center;
    min-width: 320px;
    min-height: 100vh;
  }

  .grid {
    background-color: #f6f6f6;
    background-image: linear-gradient(90deg, #cdcccc 0px, #cdcccc 1px, transparent 1px, transparent 99px, transparent 100px),
      linear-gradient(#cdcccc 0px, #cdcccc 1px, transparent 1px, transparent 99px, transparent 100px), linear-gradient(#e0e0e0 0px, #e0e0e0 1px, transparent 1px, transparent 99px, transparent 100px),
      linear-gradient(90deg, #e0e0e0 0px, #e0e0e0 1px, transparent 1px, transparent 99px, transparent 100px),
      linear-gradient(transparent 0px, transparent 5px, #f6f6f6 5px, #f6f6f6 95px, transparent 95px, transparent 100px),
      linear-gradient(90deg, #e0e0e0 0px, #e0e0e0 1px, transparent 1px, transparent 99px, #e0e0e0 99px, #e0e0e0 100px),
      linear-gradient(90deg, transparent 0px, transparent 5px, #f6f6f6 5px, #f6f6f6 95px, transparent 95px, transparent 100px),
      linear-gradient(transparent 0px, transparent 1px, #f6f6f6 1px, #f6f6f6 99px, transparent 99px, transparent 100px), linear-gradient(#cdcccc, #cdcccc);
    background-size: 100px 100%, 100% 100px, 100% 10px, 10px 100%, 100% 100px, 100px 100%, 100px 100%, 100px 100px, 100px 100px;
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
