import styled from '@emotion/styled'

interface ICropStyled {
  width: number
  height: number
  top: number
  left: number
  color: string
}

const CropStyled = styled.div<ICropStyled>`
  position: absolute;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  z-index: 9999;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  background-color: rgba(0, 0, 0, 0.55);

  & > .crop-line {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    outline: 2px dashed ${({ color }) => color};

    &.row-resize {
      cursor: row-resize;
    }
    &.col-resize {
      cursor: col-resize;
    }
    &.nw-resize {
      cursor: nw-resize;
    }
    &.ne-resize {
      cursor: ne-resize;
    }
    &.se-resize {
      cursor: se-resize;
    }
    &.sw-resize {
      cursor: sw-resize;
    }
  }
`
export default CropStyled
