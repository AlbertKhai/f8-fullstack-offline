'use client'

const FormContact = () => {
  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='grid grid-cols-2 gap-5'>
        <input
          className='border border-gray-500 px-4 py-2 focus:outline-none focus:border-purple-500'
          placeholder='First Name'
          type='text'
        />
        <input
          className='border border-gray-500 px-4 py-2 focus:outline-none focus:border-purple-500'
          placeholder='Last Name'
          type='text'
        />
        <input
          className='border border-gray-500 px-4 py-2 focus:outline-none focus:border-purple-500 col-span-2'
          placeholder='Email'
          type='email'
        />
        <input
          className='border border-gray-500 px-4 py-2 focus:outline-none focus:border-purple-500 col-span-2'
          placeholder='Phone'
          type='tel'
        />
        <textarea
          cols={10}
          rows={5}
          className='border border-gray-500 px-4 py-2 focus:outline-none focus:border-purple-500 col-span-2 resize-none'
          placeholder='Write your message...'
          defaultValue={''}
        />
      </div>
      <input
        className='focus:outline-none mt-5 bg-purple-500 px-4 py-2 text-white font-bold w-full'
        type='submit'
        defaultValue='Send Message'
      />
    </form>
  )
}

export default FormContact
