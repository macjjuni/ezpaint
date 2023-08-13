import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import { dropStyleName } from '@/styles/theme'

const ellipsis = keyframes`
  0% { content: '.'; }
  25% { content: '..'; }
  50% { content: '...'; }
  75% { content: '..'; }
  100% { content: '.'; }
`

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

  & .drop-txt {
    position: relative;

    &::after {
      content: '.';
      position: absolute;
      bottom: 0;
      right: -60px;
      width: 56px;
      height: 100%;
      color: #fff;
      animation: ${ellipsis} 3.6s ease infinite;
      z-index: 100;
    }
  }

  &.${dropStyleName} {
    transform: rotate(2deg);
    border-color: #9ae4ff;
  }
`

export default DropAreaStyle
