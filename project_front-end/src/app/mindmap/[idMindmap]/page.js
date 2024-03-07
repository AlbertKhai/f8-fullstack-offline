import { getSession } from '@auth0/nextjs-auth0'
import FlowWithProvider from './components/FlowWithProvider'
import HeaderMindmap from './components/HeaderMindmap/HeaderMindmap'

const getMindmap = async (subUser, idMindmap) => {
  const mindmapApi = process.env.URL_API_MINDMAP + 'mindmap/' + subUser
  try {
    const response = await fetch(mindmapApi)
    if (response.status === 404) throw new Error('404')
    const data = await response.json()
    return data.listMindmap?.find(({ id }) => id === idMindmap)
  } catch (error) {
    return { title: null, desc: null}
  }
}


export const generateMetadata = async ({ params }) => {
  const { idMindmap } = params
  const auth = await getSession()
  const { title, desc } = await getMindmap(auth?.user?.sub, idMindmap)
  return {
    title: title || 'My Mindmap',
    description: desc || 'My Mindmap'
  }
}


const CreateMindmap = () => {
  return (
    <main className='py-5 mx-auto'>
      <HeaderMindmap />
      <FlowWithProvider />
    </main>
  )
}

export default CreateMindmap
