import BtnSaveMindmap from './BtnSaveMindmap'
import BtnShareMindmap from './BtnShareMindmap'

const BtnHeaderMindmap = () => {
  return (
    <div className='w-1/5'>
      <div className='flex justify-end items-center'>
        <BtnSaveMindmap />
        <BtnShareMindmap />
      </div>
    </div>
  )
}

export default BtnHeaderMindmap
