import { getLang } from '@/utils/getCookie'
import InfoUser from './components/InfoUser'
import getLangPortfolio from '@/utils/getLangPortfolio'
import '@scss/pages/profile/profile.scss'
import { validProfile } from '@/utils/regexMatchUrl'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

const Profile = ({ searchParams }) => {
  const lang = getLang()
  const headersList = headers()
  const pathname = headersList.get('x-pathname')

  let queryString = new URLSearchParams(searchParams).toString()
  queryString = queryString ? '?' + queryString : ''

  if (!validProfile(pathname) || queryString) {
    const url = `/${lang}/${pathname}${queryString}`
    return redirect(url)
  }

  const { profile } = getLangPortfolio(`portfolioLang${lang === 'vi' ? 'Vi' : 'En'}.json`)

  return <InfoUser profile={profile} />
}

export default Profile
