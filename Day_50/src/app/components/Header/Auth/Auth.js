'use client'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'

import { validLogin } from '@/utils/regexMatchUrl'
import Link from 'next/link'
import BtnLogin from './BtnAuth/BtnLogin'
import BtnLogout from './BtnAuth/BtnLogout'

const Auth = () => {
  const { data: session, status } = useSession()
  const pathname = usePathname()

  if (status === 'loading') {
    return (
      <div className='auth'>
        <i className='fa-solid fa-spinner-scale fa-spin'></i>
        <span>Loading ...</span>
      </div>
    )
  }

  if (session && session.user) {
    return (
      <div className='auth'>
        <Link href='/profile' className='user-name'>
          Hi, {session.user.name}
        </Link>
        <span>|</span>
        <BtnLogout />
      </div>
    )
  }

  if (validLogin(pathname)) {
    return (
      <div className='auth'>
        <Link className='link__back-home' href={'/'}>
          <span>{pathname.startsWith('/vi') ? 'Trang chủ' : 'Home'}</span>
          <i className='fa-solid fa-house-heart'></i>
        </Link>
      </div>
    )
  }

  return <BtnLogin />
}

export default Auth
