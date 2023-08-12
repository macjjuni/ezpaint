import Layout from '@/layout/layout.style'

const blogUrl = import.meta.env.VITE_BLOG

const Footer = () => {
  return (
    <Layout.Footer>
      <a className="footer-link" target="_blank" rel="noreferrer" href={blogUrl}>
        {new Date().getFullYear()} kkusaeng.
      </a>
    </Layout.Footer>
  )
}

export default Footer
