'use client'
import { signIn, useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

const BtnLogin = ({ lang, provider }) => {
  const { status } = useSession()

  if (status === 'authenticated') return redirect('/profile')

  const handleLogin = (provider) => {
    signIn(provider, { redirect: false, callbackUrl: '/profile' })
  }

  return (
    <button onClick={() => handleLogin(provider)} className='login-btn'>
      <span>
        {lang === 'vi' ? 'Với ' : 'With '}
        {provider}
      </span>
      <i className={`fa-brands fa-${provider}`}></i>
    </button>
  )
}

export default BtnLogin
