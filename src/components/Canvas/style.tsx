import styled from '@emotion/styled'

const CanvasStyled = styled.canvas<{ display?: 'block' | 'none' }>`
  position: relative;
  display: ${(props) => props.display || 'block'};
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px,
    rgba(0, 0, 0, 0.07) 0px 32px 64px;
  opacity: 1;
  transition: opacity 0.07s ease-in-out;

  &.copy-done {
    opacity: 0;
  }
`

export default CanvasStyled
