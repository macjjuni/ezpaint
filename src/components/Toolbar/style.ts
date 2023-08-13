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
  List: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    border-radius: 2px;
    padding: 0;
    margin: 0;
  `,
  Color: styled.span<{ color: string }>`
    width: 20px;
    height: 20px;
    border: 2px solid #fff;
    background-color: ${({ color }) => color};
    border-radius: 50%;
  `,
}

export default ToolbarStyled
