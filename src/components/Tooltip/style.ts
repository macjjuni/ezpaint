import styled from '@emotion/styled'

interface ITooltipStyled {
  show: boolean
  text: string
}

const TooltipStyled = styled.div<ITooltipStyled>`
  display: ${({ text }) => (text !== '' ? 'block' : 'none')};

  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 14px;
  padding: 2px 6px;
  opacity: ${({ show }) => (show ? 1 : 0)};
  border-radius: 2px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.66);
  white-space: nowrap;
  transition: 0.2s ease;
  z-index: -1;

  top: ${({ show }) => (show ? '130%' : '110%')};
`

export default TooltipStyled
