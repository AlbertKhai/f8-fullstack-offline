import Link from 'next/link'

const Login = ({ cssBtn, cssBtnLink }) => {
  
  return (
    <>
      <Link href={'/api/auth/login'} className={cssBtn}>
        Đăng nhập
      </Link>
      <Link href={'/api/auth/login'} className={cssBtnLink}>
        Đăng ký
      </Link>
    </>
  )
}

export default Login
