import styled from '@emotion/styled'
import { css } from '@emotion/react'

const headerHeight = 48
const footerHeight = 40
const mainHieght = `calc(100dvh - (${headerHeight}px + ${footerHeight}px))`

const layoutStyle = {
  header: css`
    height: ${headerHeight}px;
  `,
  main: css`
    min-height: ${mainHieght};
  `,
  footer: css`
    height: ${footerHeight}px;
  `,
}

// 기본 레이아웃 스타일 객체
const Layout = {
  Header: styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    ${layoutStyle.header}

    & .git-icon {
      width: 28px;
      height: 28px;
    }
  `,
  Main: styled.main`
    ${layoutStyle.main}
  `,
  Footer: styled.footer`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    ${layoutStyle.footer}
    & .footer-link {
      font-style: italic;
    }
  `,
}

export default Layout
