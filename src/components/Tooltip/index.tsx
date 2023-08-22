import TooltipStyled from './style'

interface ITooltip {
  text: string
  show: boolean
}

const Tooltip = ({ text, show }: ITooltip) => {
  return (
    <TooltipStyled show={show} text={text}>
      {text}
    </TooltipStyled>
  )
}

export default Tooltip
