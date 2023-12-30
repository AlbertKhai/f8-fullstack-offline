import imgHero from '@/assets/imgs/home/hero-home.jpg'
import Image from 'next/image'

const Home = () => {
  const listTitleHero = [
    {
      title: 'DỄ SỬ DỤNG',
      content: 'FWR blocks bring in an air of fresh design with their creative layouts and blocks, which are easily customizable'
    },
    {
      title: 'KHÔNG GIỚI HẠN',
      content: 'FWR blocks bring in an air of fresh design with their creative layouts and blocks, which are easily customizable'
    },
    {
      title: 'QUẢN LÝ VÀ CHIA SẺ',
      content: 'FWR blocks bring in an air of fresh design with their creative layouts and blocks, which are easily customizable'
    }
  ]

  return (
    <main>
      <div className='bg-indigo-100 py-6 md:py-12'>
        <div className='container px-4 mx-auto'>
          <div className='text-center max-w-2xl mx-auto'>
            <h1 className='text-3xl md:text-4xl font-medium mb-2'>Học tập hiệu quả với bản đồ tư duy</h1>
            <button className='bg-indigo-600 text-white py-2 px-6 rounded-full text-xl mt-6'>Sử dụng miễn phí</button>
            <div className='mt-4'>
              <Image priority={true} src={imgHero} alt='hero-home' />
            </div>
          </div>
          <div className='md:flex md:flex-wrap md:-mx-4 mt-6 md:mt-12'>
            {listTitleHero.map(({ title, content }, index) => (
              <div key={index} className='md:w-1/3 md:px-4 xl:px-6 mt-8 md:mt-0 text-center'>
                <span className='w-20 border-t-2 border-solid border-indigo-200 inline-block mb-3' />
                <h2 className='text-xl font-medium uppercase mb-4'>{title}</h2>
                <p className='text-gray-600'>{content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

export default Home
