import '@/assets/scss/style.scss'

import Footer from './components/Footer'
import Header from './components/Header/Header'
import Image from 'next/image'
import bgPattern from '@/assets/imgs/bg.svg'
import bgPatternLight from '@/assets/imgs/bg-light.svg'
import { getTheme } from '@/utils/getCookie'
import clsx from 'clsx'

const layout = async ({ children }) => {
  const isLightMode = getTheme()

  return (
    <div className='portfolio'>
      <Image src={bgPatternLight} alt='bg-pattern' className={clsx(!isLightMode && 'hide', 'bg-pattern')} />
      <Image src={bgPattern} alt='bg-pattern' className={clsx(isLightMode && 'hide', 'bg-pattern')} />
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default layout
