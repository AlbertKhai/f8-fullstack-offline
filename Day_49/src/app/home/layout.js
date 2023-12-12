import '@/assets/scss/style.scss'
import Header from './components/Header/Header'

const layout = ({ children }) => {
  return (
    <div className='shop'>
      <Header />
      {children}
    </div>
  )
}

export default layout
