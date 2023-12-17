'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import BtnLinkProfile from './BtnLinkProfile'

const InfoUser = ({ profile }) => {
  const { data: session, status } = useSession()

  if (status === 'authenticated') {
    return (
      <main className='profile'>
        <h2 className='user-name'>Hi, {session.user.name || 'guy'}</h2>
        <BtnLinkProfile {...profile} />
      </main>
    )
  }

  if (status === 'loading') {
    return (
      <main className='profile'>
        <div className='profile-loading'>
          <i className='fa-solid fa-spinner-scale fa-spin'></i>
          <span>Loading ...</span>
        </div>
      </main>
    )
  }

  if (status === 'unauthenticated') return redirect('/login')
}

export default InfoUser
