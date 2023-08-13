import styled from '@emotion/styled'
import Canvas from '@/components/Canvas'
import { mainMinHieght } from '@/layout/layout.style'

const MainPaag = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: ${mainMinHieght};
`

const Home = () => {
  return (
    <MainPaag>
      <Canvas />
    </MainPaag>
  )
}

export default Home
