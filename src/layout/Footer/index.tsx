import { useEffect, useRef } from 'react'
import Layout from '@/layout/layout.style'

const blogUrl = import.meta.env.VITE_BLOG

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    footerRef.current?.classList.add('loaded')
  }, [])

  return (
    <Layout.Footer ref={footerRef}>
      <a className="footer-link" target="_blank" rel="noreferrer" href={blogUrl}>
        {new Date().getFullYear()} kkusaeng.
      </a>
    </Layout.Footer>
  )
}

export default Footer
