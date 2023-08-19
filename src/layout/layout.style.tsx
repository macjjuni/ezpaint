import styled from '@emotion/styled'
import { css } from '@emotion/react'

export const headerHeight = 56
const footerHeight = 32
export const defaultPadding = 12
export const mainMinHieght = `calc(100dvh - (${headerHeight}px + ${footerHeight}px + ${defaultPadding * 2}px))`

const layoutStyle = {
  common: css`
    position: relative;
    transition: opacity 0.77s ease;
  `,
  header: css`
    height: ${headerHeight}px;
    padding: 0 ${defaultPadding}px;
  `,
  main: css`
    min-height: ${mainMinHieght};
    padding: ${defaultPadding}px;
  `,
  footer: css`
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
    opacity: 0;

    z-index: 9999;
    ${layoutStyle.common}
    ${layoutStyle.header}
    &.loaded {
      opacity: 1;
    }

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
    ${layoutStyle.common}
  `,
  Footer: styled.footer`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    opacity: 0;

    ${layoutStyle.footer}
    ${layoutStyle.common}

    & .footer-link {
      font-style: italic;
    }

    &.loaded {
      opacity: 1;
    }
  `,
}

export default Layout
