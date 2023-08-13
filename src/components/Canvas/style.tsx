import styled from '@emotion/styled'

const CanvasStyled = styled.canvas<{ display?: 'block' | 'none' }>`
  display: ${(props) => props.display || 'block'};
`

export default CanvasStyled
