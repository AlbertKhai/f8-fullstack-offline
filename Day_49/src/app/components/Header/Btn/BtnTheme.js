'use client'
import clsx from 'clsx'
import Cookies from 'js-cookie'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { handleSwitchMode } from '@/app/actions'

const BtnTheme = ({ isLightMode }) => {
  const [themeLight, setThemeLight] = useState(isLightMode)

  const pathname = usePathname()
  const handleClickTheme = () => {
    const newValueTheme = !themeLight
    setThemeLight(newValueTheme)
    Cookies.set('lightMode', newValueTheme.toString())
  }

  return (
    <form
      action={async () => {
        await handleSwitchMode(pathname)
      }}
    >
      <button onClick={handleClickTheme} className='btn__theme'>
        <i className={clsx(`fa-solid fa-moon-stars`, !themeLight && 'hide')}></i>
        <i className={clsx('fa-sharp fa-solid fa-sun-bright', themeLight && 'hide')}></i>
      </button>
    </form>
  )
}

export default BtnTheme
