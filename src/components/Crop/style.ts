import styled from '@emotion/styled'

interface ICropStyled {
  width: number
  height: number
  top: number
  left: number
}

const CropStyled = styled.div<ICropStyled>`
  position: absolute;
  border: 2px dashed red;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  z-index: 9999;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
`
export default CropStyled
