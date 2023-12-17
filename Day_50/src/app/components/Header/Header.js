import DisplayMode from './BtnHeader/DisplayMode'
import DisplayLanguage from './BtnHeader/DisplayLanguage'
import Auth from './Auth/Auth'
import { getLang, getTheme } from '@/utils/getCookie'

const Header = async () => {
  const isLightMode = getTheme()
  const lang = getLang()

  return (
    <div className='container'>
      <header className='header'>
        <div className='header-btn'>
          <DisplayMode isLightMode={isLightMode} />
          <DisplayLanguage language={lang} />
        </div>
        <Auth />
      </header>
    </div>
  )
}

export default Header
