import ButtonStyled from './style'

interface IButton {
  children: React.ReactNode
  onClick?: () => void
}

const Button = ({ children, onClick }: IButton) => {
  return (
    <ButtonStyled onClick={onClick} fontSize={20}>
      {children}
    </ButtonStyled>
  )
}

export default Button
