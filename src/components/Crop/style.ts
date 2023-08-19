import styled from '@emotion/styled'

interface ICropStyled {
  top: number
  left: number
  width: number
  height: number
  squareWidth: number
}

const CropStyled = {
  Wrap: styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 9000;
    top: 0;
    left: 0;

    user-select: none;
  `,
  Resize: styled.div<ICropStyled>`
    position: absolute;
    width: ${({ width }) => width}px;
    height: ${({ height }) => height}px;

    top: ${({ top }) => top}px;
    left: ${({ left }) => left}px;

    outline: 2px dashed ${({ color }) => color};
    background-color: rgba(0, 0, 0, 0.55);

    & > :is(.topLeft, .topRight, .bottomLeft, .bottomRight) {
      position: absolute;
      width: ${({ squareWidth }) => squareWidth}px;
      height: ${({ squareWidth }) => squareWidth}px;
      background-color: ${({ color }) => color};
      border-radius: 2px;
      z-index: 20;
    }

    & > .topLeft {
      top: -${({ squareWidth }) => squareWidth / 2}px;
      left: -${({ squareWidth }) => squareWidth / 2}px;
      cursor: nwse-resize;
    }
    & > .topRight {
      top: -${({ squareWidth }) => squareWidth / 2}px;
      right: -${({ squareWidth }) => squareWidth / 2}px;
      cursor: nesw-resize;
    }
    & > .bottomLeft {
      bottom: -${({ squareWidth }) => squareWidth / 2}px;
      left: -${({ squareWidth }) => squareWidth / 2}px;
      cursor: nesw-resize;
    }
    & > .bottomRight {
      bottom: -${({ squareWidth }) => squareWidth / 2}px;
      right: -${({ squareWidth }) => squareWidth / 2}px;
      cursor: nwse-resize;
    }
  `,
}

export default CropStyled
