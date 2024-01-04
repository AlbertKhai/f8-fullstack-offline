import Auth from './Auth/Auth'
import Nav from './Nav'

const Header = () => {
  return (
    <header className='header-2'>
      <Nav>
        <Auth />
      </Nav>
    </header>
  )
}

export default Header
