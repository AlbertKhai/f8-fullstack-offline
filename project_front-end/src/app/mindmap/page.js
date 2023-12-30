import BtnCreateMindmap from './components/BtnCreateMindmap'
import HeaderBoardMindmap from './components/HeaderBoardMindmap'
import ListMindmap from './components/ListMindmap'
import { getSession } from '@auth0/nextjs-auth0'

const Mindmap = async () => {
  const auth = await getSession()

  return (
    <main className='container px-4 mx-auto'>
      <div className='text-start'>
        <h1 className='text-3xl md:text-4xl font-medium my-2'>Mindmap của tôi</h1>
        <BtnCreateMindmap />
        <HeaderBoardMindmap />
        <ListMindmap user={auth?.user} />
      </div>
    </main>
  )
}

export default Mindmap
