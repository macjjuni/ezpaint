import HeaderStyled from './style'

const gitUrl = import.meta.env.VITE_GIT_REPO

const Header = () => {
  return (
    <HeaderStyled.Header>
      <h1>EzPaint</h1>
      <a target="_blank" rel="noreferrer" href={gitUrl}>
        Git
      </a>
    </HeaderStyled.Header>
  )
}

export default Header
