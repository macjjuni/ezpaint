import ButtonStyled from './style'

interface IButton {
  children: React.ReactNode
  className?: string
  fontSize?: number
  padding?: string
  width?: number
  height?: number
  bg?: string
  borderColor?: string
  borderWidth?: string
  borderRadius?: number
  onClick?: () => void
}

const Button = ({ children, className, fontSize, padding, width, height, bg, borderRadius, borderColor, borderWidth, onClick }: IButton) => {
  return (
    <ButtonStyled
      className={className || ''}
      onClick={onClick}
      fontSize={fontSize}
      padding={padding}
      bg={bg}
      width={width}
      height={height}
      borderRadius={borderRadius}
      borderColor={borderColor}
      borderWidth={borderWidth}
    >
      {children}
    </ButtonStyled>
  )
}

export default Button
