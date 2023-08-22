import styled from '@emotion/styled'
import { css } from '@emotion/react'

const activeStyle = css`
  top: 12px;
  opacity: 1;
  z-index: 9999;
`

const ToolboxStyled = {
  Wrap: styled.div<{ active: boolean }>`
    position: absolute;
    top: -64px;
    right: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
    opacity: 0;
    z-index: -9999;
    transition: all 0.44s ease;

    ${({ active }) => (active ? activeStyle : null)}
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
    width: 70%;
    background-color: ${({ color }) => color};
    height: ${({ thick }) => thick}px;
    border-radius: 2px;
    border: 2px solid #fff;
  `,
}

export default ToolboxStyled
