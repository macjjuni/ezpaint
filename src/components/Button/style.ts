import styled from '@emotion/styled'

interface IButtun {
  fontSize?: number
}

const ButtonStyled = styled.button<IButtun>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 24px;
  font-size: ${({ fontSize }) => (fontSize ? `${fontSize}px` : '16px')};
  font-weight: 500;
  font-family: inherit;
  border-radius: 8px;
  border: 2px solid #eee;
  background-color: inherit;
  cursor: pointer;
  transition: border-color 0.25s;

  &:hover {
    border-color: #9ae4ff;
  }
  &:focus,
  &:focus-visible {
    outline: 2px auto #9ae4ff;
  }
`
export default ButtonStyled
