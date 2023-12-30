import clsx from 'clsx'
import Link from 'next/link'
import Auth from './Auth/Auth'
import { headers } from 'next/headers'

const Nav = () => {
  const pathname = headers().get('next-url')

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
          <Link href={'/'} className={clsx(isActive('/'))}>
            Trang chủ
          </Link>
          <Link href={'/about'} className={clsx(isActive('/about'))}>
            Giới thiệu
          </Link>
          <Link href={'/feature'} className={clsx(isActive('/feature'))}>
            Tính năng
          </Link>
          <Link href={'/price'} className={clsx(isActive('/price'))}>
            Bảng giá
          </Link>
          <Link href={'/contact'} className={clsx(isActive('/contact'))}>
            Liên hệ
          </Link>
          <Auth />
        </div>
      </div>
    </nav>
  )
}

export default Nav
