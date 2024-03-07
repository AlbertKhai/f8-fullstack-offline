import { useSelector } from 'react-redux'
import Login from '~/layouts/Login/Login'
import Logout from '~/layouts/Login/Logout'

const Header = () => {
  const isLogin = useSelector(({ auth }) => auth.isLogin)
  return <header className='header'>{isLogin ? <Logout /> : <Login />}</header>
}

export default Header
