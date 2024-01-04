import { notFound } from 'next/navigation'
import FlowWithProvider from './components/FlowWithProvider'
import HeaderMindmap from './components/HeaderMindmap/HeaderMindmap'
import { validate as uuidValidate } from 'uuid'
import { revalidateTag } from 'next/cache'

//Clear cache
const handleClearCache = async () => {
  'use server'
  revalidateTag('mindmap')
}

const getMindmap = async (idMindmap) => {
  const mindmapApi = process.env.URL_API_MINDMAP + 'mindmap/' + idMindmap
  try {
    const response = await fetch(mindmapApi, {
      next: {
        tags: ['mindmap']
      }
    })

    if (response.status === 404) throw new Error('404')
    await handleClearCache()
    const data = await response.json()
    return data
  } catch (error) {
    return { title: null, desc: null, image: null, error }
  }
}

export const generateMetadata = async ({ params }) => {
  const { idMindmap } = params
  let { title, desc, image } = await getMindmap(idMindmap)
  return {
    title: title || 'My Mindmap',
    description: desc || 'My Mindmap',
    openGraph: {
      title: title || 'My Mindmap',
      description: desc || 'My Mindmap',
      images: [image],
      url: process.env.AUTH0_BASE_URL
    }
  }
}

const ShareMindmap = async ({ params }) => {
  const { idMindmap } = params
  !uuidValidate(idMindmap) && notFound()
  const data = await getMindmap(idMindmap)
  if (data.error) notFound()

  return (
    <main className='py-5 mx-auto'>
      <HeaderMindmap {...data} />
      <FlowWithProvider {...data} />
    </main>
  )
}

export default ShareMindmap
