import Link from 'next/link'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faGooglePlusG } from '@fortawesome/free-brands-svg-icons'

const SocialFooter = () => {
  return (
    <div className='px-4 mt-4 sm:w-1/3 xl:w-1/6 sm:mx-auto xl:mt-0 xl:ml-auto'>
      <h5 className='text-xl font-bold mb-6 sm:text-center xl:text-left'>Stay connected</h5>
      <div className='flex sm:justify-center xl:justify-start'>
        <Link
          href='#'
          className='w-8 h-8 border border-gray-400 rounded-full text-center py-1 text-gray-600 hover:text-white hover:bg-blue-600 hover:border-blue-600'
        >
          <FontAwesomeIcon icon={faFacebook} />
        </Link>
        <Link
          href='#'
          className='w-8 h-8 border border-gray-400 rounded-full text-center py-1 ml-2 text-gray-600 hover:text-white hover:bg-blue-400 hover:border-blue-400'
        >
          <FontAwesomeIcon icon={faTwitter} />
        </Link>
        <Link
          href='#'
          className='w-8 h-8 border border-gray-400 rounded-full text-center py-1 ml-2 text-gray-600 hover:text-white hover:bg-red-600 hover:border-red-600'
        >
          <FontAwesomeIcon icon={faGooglePlusG} />
        </Link>
      </div>
    </div>
  )
}

export default SocialFooter
