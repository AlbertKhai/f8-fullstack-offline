import Link from 'next/link'
import { usePathname } from 'next/navigation'

const BtnLogin = () => {
  const pathname = usePathname()

  return (
    <div className='auth'>
      <Link className='btn-auth' href={'/login'}>
        <span>{pathname.startsWith('/vi') ? 'Đăng nhập' : 'Login'}</span>
        <i className='fa-solid fa-user'></i>
      </Link>
    </div>
  )
}

export default BtnLogin
