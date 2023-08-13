import styled from '@emotion/styled'

const ButtonStyled = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 24px;
  font-size: 16px;
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

interface IButton {
  children: React.ReactNode
  onClick?: () => void
}

const Button = ({ children, onClick }: IButton) => {
  return <ButtonStyled onClick={onClick}>{children}</ButtonStyled>
}

export default Button
