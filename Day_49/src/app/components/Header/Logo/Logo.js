import Link from 'next/link'

const Logo = () => {
  return (
    <div className='logo'>
      <Link href='/home'>
        <span className='logo-text__s'>S</span>
        <span className='logo-text'>TRAVEL</span>
      </Link>
    </div>
  )
}

export default Logo
