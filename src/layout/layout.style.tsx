import { css } from '@emotion/react'

const headerHeight = 48
const footerHeight = 40
const mainHieght = `calc(100dvh - (${headerHeight}px + ${footerHeight}px))`
const padding = '0 12px'

const layoutStyle = {
  header: css`
    height: ${headerHeight}px;
    padding: ${padding};
  `,
  main: css`
    min-height: ${mainHieght};
    padding: ${padding};
  `,
  footer: css`
    height: ${footerHeight}px;
    padding: ${padding};
  `,
}

export default layoutStyle
