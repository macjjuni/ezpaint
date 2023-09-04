import { Helmet } from 'react-helmet-async'

const title = import.meta.env.VITE_TITLE || 'EZ Paint.'

const SEO = () => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="Eazy Paint. Eazy draw and crop images" />
      <meta name="keywords" content="Web Image Paint. Image Draw and Crop" />
      <meta name="author" content="ez-paint.web.app" />
    </Helmet>
  )
}

export default SEO
