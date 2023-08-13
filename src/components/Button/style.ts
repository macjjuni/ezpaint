import styled from '@emotion/styled'

interface IButtun {
  fontSize?: number
  padding?: string
  width?: number
  height?: number
  bg?: string
  borderRadius?: number
  borderColor?: string
  borderWidth?: string
  focus?: string
}

const ButtonStyled = styled.button<IButtun>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => (width ? `${width}px` : 'auto')};
  height: ${({ height }) => (height ? `${height}px` : 'auto')};
  padding: ${({ padding }) => padding || '10px 20px'};
  font-size: ${({ fontSize }) => (fontSize ? `${fontSize}px` : '14px')};
  font-weight: 500;
  font-family: inherit;
  color: #fff;
  border: none;
  border-radius: ${({ borderRadius }) => borderRadius || '6'}px;
  border-width: ${({ borderWidth }) => (borderWidth ? `${borderWidth}px` : 'none')};
  border-color: ${({ borderColor }) => borderColor || 'none'};
  background-color: ${({ bg }) => bg || 'rgba(0, 0, 0, 0.4)'};
  cursor: pointer;
  transition: box-shadow 0.25s;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
`
export default ButtonStyled
