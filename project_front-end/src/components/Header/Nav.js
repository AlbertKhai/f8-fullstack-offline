'use client'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const dataLinks = [
  {
    href: '/',
    content: 'Trang chủ'
  },
  {
    href: '/about',
    content: 'Giới thiệu'
  },
  {
    href: '/feature',
    content: 'Tính năng'
  },
  {
    href: '/price',
    content: 'Bảng giá'
  },
  {
    href: '/contact',
    content: 'Liên hệ'
  }
]

const Nav = ({ children }) => {
  const pathname = usePathname()

  const isActive = (path) => {
    let classCss = 'p-2 lg:px-4 md:mx-2 rounded'
    classCss +=
      path === pathname
        ? ' text-white bg-indigo-600'
        : ' text-gray-600 hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300'
    return classCss.split(' ')
  }

  return (
    <nav className='bg-white py-2 md:py-4'>
      <div className='container px-4 mx-auto md:flex md:items-center'>
        <div className='flex justify-between items-center'>
          <Link href='/' className='font-bold text-xl text-indigo-600'>
            Mindmap Flow
          </Link>
        </div>
        <div className='hidden md:flex flex-col md:flex-row md:ml-auto mt-3 md:mt-0' id='navbar-collapse'>
          {dataLinks.map(({ content, href }) => {
            return (
              <Link key={href} href={href} className={clsx(isActive(href))}>
                {content}
              </Link>
            )
          })}
          {children}
        </div>
      </div>
    </nav>
  )
}

export default Nav
