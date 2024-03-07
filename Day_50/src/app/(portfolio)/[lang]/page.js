import { redirect } from 'next/navigation'
import getLangPortfolio from '@/utils/getLangPortfolio'
import { getLang } from '@/utils/getCookie'

import '@scss/pages/portfolio/portfolio.scss'

import Hero from './components/Hero/Hero'
import ListBrand from './components/Brand/ListBrand'
import Service from './components/Service/Service'
import Contact from './components/Contact/Contact'

const portfolioEn = async ({ params, searchParams }) => {
  const { lang } = params

  const pathnameAccept = ['vi', 'en', '/']
  let queryString = new URLSearchParams(searchParams).toString()
  queryString = queryString ? '?' + queryString : ''

  if (!pathnameAccept.includes(lang) || queryString) {
    const language = getLang()
    const url = `/${language}/${lang}${queryString}`
    return redirect(url)
  }

  const { hero, service, contact } = getLangPortfolio(`portfolioLang${lang === 'vi' ? 'Vi' : 'En'}.json`)

  return (
    <main className='portfolio'>
      <div className={`portfolio-${lang}`}>
        <Hero {...hero} />
        <ListBrand />
        <Service {...service} />
        <Contact {...contact} />
      </div>
    </main>
  )
}

export default portfolioEn
