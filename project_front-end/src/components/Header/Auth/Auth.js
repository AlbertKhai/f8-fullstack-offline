import { getSession } from '@auth0/nextjs-auth0'
import Login from './Login'
import Logout from './Logout'

const cssBtn =
  'p-2 lg:px-4 md:mx-2 text-indigo-600 text-center border border-transparent rounded hover:bg-indigo-100 hover:text-indigo-700 transition-colors duration-300'

const cssBtnLink =
  'p-2 lg:px-4 md:mx-2 text-indigo-600 text-center border border-solid border-indigo-600 rounded hover:bg-indigo-600 hover:text-white transition-colors duration-300 mt-1 md:mt-0 md:ml-1'

const Auth = async () => {
  const auth = await getSession()

  const user = auth?.user || null

  if (user) return <Logout {...{ user, cssBtn, cssBtnLink }} />
  return <Login {...{ cssBtn, cssBtnLink }} />
}

export default Auth
