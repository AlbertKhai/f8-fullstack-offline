import Logo from '@/app/components/Header/Logo/Logo'
import NavHome from './NavHome/NavHome'
import BtnHome from './BtnHome/BtnHome'

const Header = () => {
  return (
    <div className='header'>
      <div className='container'>
        <Logo />
        <NavHome />
        <BtnHome />
      </div>
    </div>
  )
}

export default Header
