import styled from '@emotion/styled'
import { dropStyleName } from '@/styles/theme'

const DropAreaStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  width: 80%;
  height: 50%;
  border: 4px dashed #eee;
  border-radius: 16px;
  font-size: 32px;
  user-select: none;
  transition: transform 0.24s ease, transform 0.1s ease;

  &.${dropStyleName} {
    transform: rotate(2deg);
    border-color: #9ae4ff;
  }
`

export default DropAreaStyle
