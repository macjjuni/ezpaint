import styled from '@emotion/styled'
import { css } from '@emotion/react'

const activeStyle = css`
  top: -50px;
  opacity: 0;
`

const ToolbarStyled = {
  Wrap: styled.div<{ active: boolean }>`
    position: absolute;
    top: 12px;
    right: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
    opacity: 1;
    z-index: 0;
    transition: all 0.27s ease;

    ${({ active }) => (!active ? activeStyle : '')}
  `,
  Left: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  Right: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    border-radius: 2px;
    padding: 0;
    margin: 0;
    & .active {
      background-color: rgba(0, 0, 0, 0.77);
    }
  `,
  Color: styled.span<{ color: string }>`
    width: 20px;
    height: 20px;
    border: 2px solid #fff;
    background-color: ${({ color }) => color};
    border-radius: 50%;
  `,
  Thick: styled.span<{ thick: number; color: string }>`
    width: 75%;
    background-color: ${({ color }) => color};
    height: ${({ thick }) => thick}px;
    border-radius: 3px;
    border: 2px solid #fff;
  `,
}

export default ToolbarStyled
