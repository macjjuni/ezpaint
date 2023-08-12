import { ThemeProvider } from '@emotion/react'
import { Outlet } from 'react-router'
import Header from './layout/Header'
import Main from './layout/Main/Main'
import Footer from './layout/Footer'
import GlobalStyles from './styles/global'
import theme from './styles/theme'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </ThemeProvider>
  )
}

export default App