import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ItemFeature = ({ title, desc, icon }) => {
  return (
    <article className='px-4 md:w-1/3 mt-6 md:mt-0'>
      <div className='feature-box text-center p-4 md:p-6 max-w-sm mx-auto border-2 border-solid border-gray-300 rounded md:h-full'>
        <div className='text-xl p-4 w-16 h-16 mx-auto text-indigo-600'>
          <i className='fas fa-bolt text-indigo-600' />
          <FontAwesomeIcon icon={icon} />
        </div>
        <h2 className='text-xl font-medium mb-4'>{title}</h2>
        <p className='text-gray-600 mb-3'>{desc}</p>
      </div>
    </article>
  )
}

export default ItemFeature
