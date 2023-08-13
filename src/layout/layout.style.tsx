import styled from '@emotion/styled'
import { css } from '@emotion/react'

const headerHeight = 56
const footerHeight = 32
const defaultPadding = 12
export const mainMinHieght = `calc(100dvh - (${headerHeight}px + ${footerHeight}px + ${defaultPadding * 2}px))`

const layoutStyle = {
  header: css`
    position: relative;
    height: ${headerHeight}px;
    padding: 0 ${defaultPadding}px;
  `,
  main: css`
    position: relative;
    min-height: ${mainMinHieght};
  `,
  footer: css`
    position: relative;
    height: ${footerHeight}px;
    padding: 0 ${defaultPadding}px;
  `,
}

// 기본 레이아웃 스타일 객체
const Layout = {
  Header: styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    ${layoutStyle.header}
    z-index: 9999;

    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: #646464;
    }

    & .git-icon {
      width: 28px;
      height: 28px;
    }
  `,
  Main: styled.main`
    ${layoutStyle.main}
    padding: ${defaultPadding}px;
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
