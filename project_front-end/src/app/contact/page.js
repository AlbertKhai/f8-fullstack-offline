import FormContact from './components/FormContact'

export const metadata = {
  title: 'Liên hệ - Mindmap Flow',
  description: 'Liên hệ - Mindmap Flow - Project Front-end'
}

const Contact = () => {
  return (
    <div className='container mx-auto my-20 w-1/3 border text-indigo-600 bg-white'>
      <div className='p-5 space-y-5 shadow-xl'>
        <h1 className='text-center text-3xl'>Contact Us</h1>
        <FormContact />
      </div>
    </div>
  )
}

export default Contact
