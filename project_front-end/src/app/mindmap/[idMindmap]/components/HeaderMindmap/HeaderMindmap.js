import BtnHeaderMindmap from './BtnHeaderMindmap/BtnHeaderMindmap'
import TitleMindmap from './TitleMindmap'

const HeaderMindmap = () => {
  return (
    <header className='text-start'>
      <div className='container mx-auto'>
        <div className='flex flex-wrap'>
          <TitleMindmap />
          <BtnHeaderMindmap />
        </div>
      </div>
    </header>
  )
}

export default HeaderMindmap
