import DefaultLayout from '../components/DefaultLayout'
import getLangPortfolio from '@/utils/getLangPortfolio'

const portfolioVi = async () => {
  const data = getLangPortfolio('portfolioLangVi.json')

  return (
    <main className='portfolio-vi'>
      <DefaultLayout {...data} />
    </main>
  )
}

export default portfolioVi
