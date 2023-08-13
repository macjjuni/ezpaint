import { AiFillGithub } from 'react-icons/ai'
import Layout from '@/layout/layout.style'

const title = import.meta.env.VITE_TITLE
const gitUrl = import.meta.env.VITE_GIT_REPO

const Header = () => {
  return (
    <Layout.Header className="grid">
      <h1>{title}</h1>
      <a className="git-icon" target="_blank" rel="noreferrer" href={gitUrl}>
        <AiFillGithub fontSize={28} />
      </a>
    </Layout.Header>
  )
}

export default Header
