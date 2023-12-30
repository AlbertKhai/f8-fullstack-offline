const HeaderFeature = () => {
  return (
    <header className='flex -mx-4'>
      <div className='px-4 text-center md:w-10/12 xl:w-8/12 mx-auto'>
        <h1 className='mb-4 text-4xl font-medium'>Features</h1>
        <p className='mb-4 text-xl'>
          The main aim of creating FWR blocks is to help designers, developers and agencies create websites and web apps quickly
          and easily. Each and every block uses minimal custom styling and is based on the utility first Tailwind framework.
        </p>
        <button className='border-2 border-solid border-indigo-600 rounded py-2 px-12 text-xl text-indigo-600 hover:bg-indigo-600 hover:text-white mt-4 transition-color duration-300'>
          Learn More
        </button>
      </div>
    </header>
  )
}

export default HeaderFeature
