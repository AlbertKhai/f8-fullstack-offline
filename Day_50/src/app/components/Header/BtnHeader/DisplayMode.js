'use client'
import Cookies from 'js-cookie'
import { handleSwitchMode } from '@/app/(portfolio)/[lang]/actions'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

const DisplayMode = ({ isLightMode }) => {
  const [light, setLight] = useState(isLightMode)
  const pathname = usePathname()
  const handleClick = () => {
    const newLightMode = !light
    setLight(newLightMode)
    Cookies.set('lightMode', newLightMode.toString())
  }

  return (
    <form
      action={async () => {
        await handleSwitchMode(pathname)
      }}
    >
      <button onClick={handleClick} className='header-btn__dark-mode'>
        <i className={clsx(`fa-solid fa-moon-stars`, !light && 'hide')}></i>
        <i className={clsx('fa-sharp fa-solid fa-sun-bright', light && 'hide')}></i>
      </button>
    </form>
  )
}

export default DisplayMode
