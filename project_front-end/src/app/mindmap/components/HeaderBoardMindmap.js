const HeaderBoardMindmap = () => {
  return (
    <div className='py-4'>
      <div className='flex items-center py-2'>
        <span className='w-1/6 text-center'>
          <input type='checkbox' />
        </span>
        <span className='w-1/2'>
          <span className='text-xs uppercase text-gray-600 font-bold'>Tên</span>
        </span>
        <span className='w-1/4'>
          <span className='text-xs uppercase text-gray-600 font-bold'>Tạo lúc</span>
        </span>
        <span className='w-1/4'>
          <span className='text-xs uppercase text-gray-600 font-bold'>Hành động</span>
        </span>
      </div>
    </div>
  )
}

export default HeaderBoardMindmap
