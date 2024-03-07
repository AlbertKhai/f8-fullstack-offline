'use client'

import Cookies from 'js-cookie'
import { signIn } from 'next-auth/react'
import Link from 'next/link'

const providers = ['google', 'github']

const BtnLinkProfile = ({ notLink, clickToLink, linked, backHome }) => {
  const providersLogged = Cookies.get('providersLogged')?.split('/')

  const handleLogin = (provider) => {
    signIn(provider, { redirect: false, callbackUrl: '/profile' })
  }

  return (
    <div className='wrap-social'>
      {providers.map((provider) => {
        if (!providersLogged?.includes(provider)) {
          return (
            <p key={provider} className='profile-mess'>
              {notLink}
              {provider}
            </p>
          )
        }
        return null
      })}

      {providers.map((provider) => {
        if (!providersLogged?.includes(provider)) {
          return (
            <div key={provider} className='wrap-btn__social'>
              <button onClick={() => handleLogin(provider)} className='btn-link__social'>
                <span>
                  {clickToLink}
                  {provider}
                </span>
                <i className={`fa-brands fa-${provider}`}></i>
              </button>
            </div>
          )
        }

        return (
          <p key={provider} className='linked-social'>
            <span>
              {linked}
              {provider}
            </span>
            <i className={`fa-brands fa-${provider}`}></i>
          </p>
        )
      })}
      <Link href='/' className='btn__back-home'>
        <span>{backHome}</span>
        <i className='fa-solid fa-house-heart'></i>
      </Link>
    </div>
  )
}

export default BtnLinkProfile
