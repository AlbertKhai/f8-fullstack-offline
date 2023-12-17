import '@scss/pages/login/login.scss'
import BtnLogin from './components/BtnLogin'
import { getLang } from '@/utils/getCookie'
import { headers } from 'next/headers'
import { validLogin } from '@/utils/regexMatchUrl'
import { redirect } from 'next/navigation'

const providers = ['google', 'github']

const Login = ({ searchParams }) => {
  const lang = getLang()

  const headersList = headers()
  const pathname = headersList.get('x-pathname')

  let queryString = new URLSearchParams(searchParams).toString()
  queryString = queryString ? '?' + queryString : ''

  if (!validLogin(pathname) || queryString) {
    const url = `/${lang}/${pathname}${queryString}`
    return redirect(url)
  }

  return (
    <main className='login'>
      <h1 className='login-title'>{lang === 'vi' ? 'Đăng nhập' : 'Login'}</h1>
      <div className='login-wrap__btn'>
        {providers.map((provider) => {
          return <BtnLogin key={provider} provider={provider} lang={lang} />
        })}
      </div>
    </main>
  )
}

export default Login
