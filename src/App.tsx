import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from '@emotion/react'
import { Outlet } from 'react-router'
import Header from './layout/Header'
import Main from './layout/Main/Main'
import Footer from './layout/Footer'
import DrawCursor from './components/DrawCursor'
import GlobalStyles from './styles/global'
import theme from './styles/theme'
import GoogleGA from '@/components/GoogleGA'
import SEO from './components/Helmet'

import 'react-image-crop/dist/ReactCrop.css'

const App = () => {
  GoogleGA()
  return (
    <HelmetProvider>
      <SEO />
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <DrawCursor />
        <Header />
        <Main>
          <Outlet />
        </Main>
        <Footer />
      </ThemeProvider>
    </HelmetProvider>
  )
}

export default App
