import styled from '@emotion/styled'

const RangeStyled = {
  Wrap: styled.div<{ color: string }>`
    width: 200px;
    margin: 0;
    padding: 12px 12px;
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.4) !important;

    & > .rangeslider {
      margin: 0 !important;
    }

    & .rangeslider-horizontal {
      height: 10px;
    }

    & .rangeslider-horizontal .rangeslider__handle {
      width: 16px;
      height: 16px;
    }
    & .rangeslider-horizontal .rangeslider__handle:after {
      content: none;
    }
    & .rangeslider-horizontal .rangeslider__fill {
      background-color: ${({ color }) => color};
    }
  `,
}

export default RangeStyled
