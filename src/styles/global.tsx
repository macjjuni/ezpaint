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

  body {
    margin: 0;
    display: flex;
    place-items: center;
    min-width: 320px;
    min-height: 100vh;
  }

  #ez-paint {
    width: 100%;
    padding: 0 12px;
  }

  /* ----- 반응형 Mobile 사이즈 ----- */
  ${theme.Response.mobile} {
  }
`

const GlobalStyles = () => <Global styles={globalStyles} />
export default GlobalStyles
