import DisplayMode from './BtnHeader/DisplayMode'
import DisplayLanguage from './BtnHeader/DisplayLanguage'
import Nav from './Nav'
import { getTheme } from '@/utils/getCookie'

const Header = async () => {
  const isLightMode = getTheme()

  return (
    <div className='container'>
      <header className='header'>
        <Nav />
        <div className='header-btn'>
          <DisplayLanguage />
          <DisplayMode isLightMode={isLightMode} />
        </div>
      </header>
    </div>
  )
}

export default Header
