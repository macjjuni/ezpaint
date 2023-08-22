import { useEffect, useRef } from 'react'
import { AiFillGithub } from 'react-icons/ai'
import Layout from '@/layout/layout.style'
import Button from '@/components/Button'

const title = import.meta.env.VITE_LOGO
const gitUrl = import.meta.env.VITE_GIT_REPO

const Header = () => {
  const headerRef = useRef<HTMLHeadElement>(null)

  useEffect(() => {
    headerRef.current?.classList.add('loaded')
  }, [])

  return (
    <Layout.Header ref={headerRef} className="grid">
      <h1>{title}</h1>
      <Button padding="4px">
        <a className="git-icon" target="_blank" rel="noreferrer" href={gitUrl}>
          <AiFillGithub fontSize={26} />
        </a>
      </Button>
    </Layout.Header>
  )
}

export default Header
