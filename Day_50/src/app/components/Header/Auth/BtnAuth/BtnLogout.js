'use client'
import Cookies from 'js-cookie'
import { signOut } from 'next-auth/react'

const BtnLogout = () => {
  const handleLogout = () => {
    signOut({ redirect: false })
    Cookies.remove('providersLogged')
  }

  return (
    <button onClick={() => handleLogout()} className='btn-auth'>
      <span>Logout</span>
      <i className='fa-solid fa-arrow-right-from-bracket'></i>
    </button>
  )
}

export default BtnLogout
