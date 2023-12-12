import BtnTheme from '@/app/components/Header/Btn/BtnTheme'
import BtnSearch from './BtnSearch'
import BtnUser from './BtnUser'
import { getTheme } from '@/utils/getCookie'

const BtnHome = () => {
  const isLightMode = getTheme()
  return (
    <div className='btn-header'>
      <BtnTheme isLightMode={isLightMode} />
      <BtnSearch />
      <BtnUser />
    </div>
  )
}

export default BtnHome
