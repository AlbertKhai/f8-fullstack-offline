export const metadata = {
  title: 'Day-50'
}

import Image from 'next/image'
import AuthProvider from './context/AuthProvider'
import Header from './components/Header/Header'
import Footer from './components/Footer'

import bgPattern from '@/assets/imgs/bg.svg'
import bgPatternLight from '@/assets/imgs/bg-light.svg'

import '@/assets/scss/styleBase.scss'
import '@/assets/scss/layouts/header.scss'
import '@/assets/scss/layouts/footer.scss'

import { getTheme } from '@/utils/getCookie'

import clsx from 'clsx'

export default async function RootLayout({ children }) {
  const isLightMode = getTheme()

  return (
    <html lang='en'>
      <head>
        <link rel='preconnect' href='https://site-assets.fontawesome.com' />
        <link rel='preconnect' href='https://use.fortawesome.com' />
        <link rel='stylesheet' href='https://site-assets.fontawesome.com/releases/v6.5.1/css/all.css' />
        <link rel='stylesheet' href='https://site-assets.fontawesome.com/releases/v6.5.1/css/sharp-solid.css' />
        <link rel='stylesheet' href='https://site-assets.fontawesome.com/releases/v6.5.1/css/sharp-regular.css' />
        <link rel='stylesheet' href='https://site-assets.fontawesome.com/releases/v6.5.1/css/sharp-light.css' />
        <link rel='stylesheet' href='https://use.fortawesome.com/kits/1ce05b4b/publications/125785/woff2.css' media='all' />
      </head>
      <body id='body' className={clsx(isLightMode && 'light-mode')}>
        <Image src={bgPattern} alt='bg-pattern' className={clsx(isLightMode && 'hide', 'bg-pattern')} />
        <Image src={bgPatternLight} alt='bg-pattern' className={clsx(!isLightMode && 'hide', 'bg-pattern')} />
        <AuthProvider>
          <Header />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
