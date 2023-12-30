export const metadata = {
  title: 'Tính năng - Mindmap Flow',
  description: 'Tính năng - Mindmap Flow - Project Front-end'
}

import HeaderFeature from './components/HeaderFeature'
import ListFeature from './components/ListFeature'

const Feature = () => {
  return (
    <main className='feature-1 py-6 md:py-12'>
      <div className='container px-4 mx-auto'>
        <HeaderFeature />
        <ListFeature />
      </div>
    </main>
  )
}

export default Feature
