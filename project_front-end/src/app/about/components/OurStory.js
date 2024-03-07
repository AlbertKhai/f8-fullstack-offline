import Image from 'next/image'

import ourStory1 from '@imgs/about/ourStory/our-story-1.png'
import ourStory2 from '@imgs/about/ourStory/our-story-2.png'
import ourStory3 from '@imgs/about/ourStory/our-story-3.png'
import ourStory4 from '@imgs/about/ourStory/our-story-4.png'

const OurStory = () => {
  const listStory = [
    {
      srcImg: ourStory1,
      nameUser: 'Alexa'
    },
    {
      srcImg: ourStory2,
      nameUser: 'Olivia'
    },
    {
      srcImg: ourStory3,
      nameUser: 'Liam'
    },
    {
      srcImg: ourStory4,
      nameUser: 'Elijah'
    }
  ]

  return (
    <section className='flex lg:flex-row flex-col justify-between gap-8 pt-12'>
      <div className='w-full lg:w-5/12 flex flex-col justify-center'>
        <h2 className='text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4'>Our Story</h2>
        <p className='font-normal text-base leading-6 text-gray-600'>
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its
          layout. The point of using Lorem Ipsum.In the first place we have granted to God, and by this our present charter
          confirmed for us and our heirs forever that the English Church shall be free, and shall have her rights entire, and her
          liberties inviolate; and we will that it be thus observed; which is apparent from
        </p>
      </div>
      <div className='w-full lg:w-8/12 lg:pt-8'>
        <ul className='grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:gap-4 shadow-lg rounded-md'>
          {listStory.map(({ srcImg, nameUser }, index) => (
            <li key={index} className='p-4 pb-6 flex justify-center flex-col items-center'>
              <Image className='md:block hidden' src={srcImg} alt='Alexa featured Image' priority={true} />
              <p className='font-medium text-xl leading-5 text-gray-800 dark:text-white mt-4'>{nameUser}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default OurStory
