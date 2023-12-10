'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Cookies from 'js-cookie'
import clsx from 'clsx'

const DisplayLanguage = () => {
  const pathname = usePathname()
  const [lang, setLang] = useState(pathname === '/vi' ? 'vi' : 'en')
  const isActive = (path) => {
    return path === pathname ? 'active' : ''
  }

  const switchLang = (newLang) => {
    setLang(newLang)
    Cookies.set('language', newLang)
  }

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  return (
    <div className='wrap__switch-languages'>
      <Link className={clsx(isActive('/en'), 'link-language')} href='/en' onClick={() => switchLang('en')}>
        EN
      </Link>
      <span>/</span>
      <Link className={clsx(isActive('/vi'), 'link-language')} href='/vi' onClick={() => switchLang('vi')}>
        VN
      </Link>
    </div>
  )
}

export default DisplayLanguage
