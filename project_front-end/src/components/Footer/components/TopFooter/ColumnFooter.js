import NavFooter from './NavFooter'

const ColumnFooter = ({ titleColumn, linkNav, contentsNav }) => {
  return (
    <div className='px-4 sm:w-1/2 md:w-1/4 xl:w-1/6'>
      <h3 className='text-xl font-bold mb-6'>{titleColumn}</h3>
      <ul className='list-none footer-links'>
        {contentsNav.map((item, index) => (
          <NavFooter key={index} contentNav={item} linkNav={linkNav} />
        ))}
      </ul>
    </div>
  )
}

export default ColumnFooter
