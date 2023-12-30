import Link from 'next/link'

const NavFooter = ({ linkNav, contentNav }) => {
  return (
    <li className='mb-2'>
      <Link href={linkNav} className='border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800'>
        {contentNav}
      </Link>
    </li>
  )
}

export default NavFooter
