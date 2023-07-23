import FooterStyled from './style'

const blogUrl = import.meta.env.VITE_BLOG

const Footer = () => {
  return (
    <FooterStyled.Footer>
      <a target="_blank" rel="noreferrer" href={blogUrl}>
        kku.dev
      </a>
    </FooterStyled.Footer>
  )
}

export default Footer
