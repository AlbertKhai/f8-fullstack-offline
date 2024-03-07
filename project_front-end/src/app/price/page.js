export const metadata = {
  title: 'Bảng giá - Mindmap Flow',
  description: 'Bảng giá - Mindmap Flow - Project Front-end'
}

import HeaderPrice from './components/HeaderPrice'
import ListPrice from './components/ListPrice'

const Price = () => {
  return (
    <main className='max-w-6xl mx-auto pt-10 pb-36 px-8'>
      <HeaderPrice />
      <ListPrice />
    </main>
  )
}

export default Price
