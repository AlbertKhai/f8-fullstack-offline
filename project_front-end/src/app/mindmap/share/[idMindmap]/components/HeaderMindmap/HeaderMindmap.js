const HeaderMindmap = ({ title, desc }) => {
  return (
    <header className='text-left'>
      <div className='container mx-auto'>
        <div className='flex flex-wrap'>
          <div className='w-4/5'>
            <h1 className='text-2xl md:text-4xl font-medium my-2 outline-0'>{title}</h1>
            <p className='outline-0'>{desc}</p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default HeaderMindmap
