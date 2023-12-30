import BtnHeaderMindmap from './BtnHeaderMindmap'
import InfoMindmap from './InfoMindmap'

const HeaderMindmap = ({ idMindmap }) => {
  return (
    <header className='text-start'>
      <div className='container mx-auto'>
        <div className='flex flex-wrap'>
          <InfoMindmap idMindmap={idMindmap} />
          <BtnHeaderMindmap />
        </div>
      </div>
    </header>
  )
}

export default HeaderMindmap
