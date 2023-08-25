import styled from '@emotion/styled'

interface ICanvasStyled {
  isVis: 0 | 1
}

const CanvasStyled = styled.canvas<ICanvasStyled>`
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px,
    rgba(0, 0, 0, 0.07) 0px 32px 64px;
  visibility: ${({ isVis }) => (isVis ? 'visible' : 'hidden')};
  transition: opacity 0.07s ease-in-out;
  user-select: none;
  cursor: none;

  &.copy-done {
    opacity: 0;
  }
`

export default CanvasStyled
