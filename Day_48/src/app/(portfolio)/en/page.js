import DefaultLayout from '../components/DefaultLayout'
import getLangPortfolio from '@/utils/getLangPortfolio'

const portfolioEn = async () => {
  const data = getLangPortfolio('portfolioLangEn.json')

  return (
    <main className='portfolio-en'>
      <DefaultLayout {...data} />
    </main>
  )
}

export default portfolioEn
