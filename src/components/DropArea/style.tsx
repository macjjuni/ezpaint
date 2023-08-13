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

const DropAreaStyled = {
  DropArea: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 48px;
    width: 80%;
    height: calc(100dvh * 0.4);
    border: 2px dashed #545454;
    border-radius: 16px;
    background-color: rgba(0, 0, 0, 0.1);
    font-size: 32px;
    user-select: none;
    transition: all 0.16s ease-in-out, all 0.16s ease-in-out;

    & .drop-text-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;

      & .drop-txt {
        position: relative;
        font-size: 32px;
        margin: -4px 0;
      }

      & .drop-txt.ellipsis::after {
        content: '.';
        position: absolute;
        bottom: 0;
        right: -60px;
        width: 56px;
        height: 100%;
        animation: ${ellipsis} 3.6s ease infinite;
        z-index: 100;
      }
    }

    &.${dropStyleName} {
      transform: rotate(4deg);
      border-width: 3px;
      background-color: rgba(0, 0, 0, 0.3);
    }
  `,
  ButtonWrapper: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
    & > span {
      position: relative;
      top: 1px;
      font-size: 20px;
    }
  `,
}

export default DropAreaStyled
