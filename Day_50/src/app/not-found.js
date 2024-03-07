import Link from 'next/link'
import '@scss/pages/notFound/notFound.scss'

import { getLang } from '@/utils/getCookie'
import getLangPortfolio from '@/utils/getLangPortfolio'

const NotFound = () => {
  const language = getLang()

  const {
    notFound: { title, backHome }
  } = getLangPortfolio(`portfolioLang${language === 'vi' ? 'Vi' : 'En'}.json`)

  return (
    <main className='not-found'>
      <h1 className='not-found__title'>{title}</h1>
      <dir className='wrap-link__back-home'>
        <Link className='link__back-home' href='/'>
          <span>{backHome}</span>
          <i className='fa-solid fa-house-heart'></i>
        </Link>
      </dir>
    </main>
  )
}

export default NotFound
