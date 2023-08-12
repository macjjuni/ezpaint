import styled from '@emotion/styled'
import Canvas from '@/components/Canvas'
import { mainHieght } from '@/layout/layout.style'

const MainPaag = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: ${mainHieght};
`

const Home = () => {
  return (
    <MainPaag>
      <Canvas />
    </MainPaag>
  )
}

export default Home
