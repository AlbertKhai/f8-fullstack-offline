import BottomFooter from './components/BottomFooter'
import TopFooter from './components/TopFooter/TopFooter'

const Footer = () => {
  return (
    <footer className='footer-1 bg-gray-100 py-8 sm:py-12'>
      <div className='container mx-auto px-4'>
        <TopFooter />
        <BottomFooter />
      </div>
    </footer>
  )
}

export default Footer
