import styled from '@emotion/styled'

interface IDrawCursor {
  inCanvas: boolean
  x: number
  y: number
  thick: number
  color: string
}

const DrawCursorStyled = styled.div<IDrawCursor>`
  display: ${({ inCanvas }) => (inCanvas ? 'block' : 'none')};
  position: absolute;
  top: ${({ y }) => y}px;
  left: ${({ x }) => x}px;
  /* transform: translate(-${({ thick }) => thick / 2}px, -${({ thick }) => thick / 2}px); */
  width: ${({ thick }) => thick}px;
  height: ${({ thick }) => thick}px;
  background-color: ${({ color }) => color};
  border-radius: 50%;
  z-index: 9999;
  pointer-events: none;
`

export default DrawCursorStyled
