import Image from 'next/image'
import Link from 'next/link'

import thumbnailPrice1 from '@imgs/price/thumbnail-price-1.jpg'
import thumbnailPrice2 from '@imgs/price/thumbnail-price-2.jpg'
import thumbnailPrice3 from '@imgs/price/thumbnail-price-3.jpg'

import checkGrey from '@imgs/price/check-grey.svg'
import checkWhite from '@imgs/price/check-white.svg'
import arrowRight from '@imgs/price/arrow-right.svg'

const ListPrice = () => {
  return (
    <ul className='flex flex-col justify-between items-center lg:flex-row lg:items-start'>
      <li className='w-full flex-1 mt-8 p-8 order-2 bg-white shadow-xl rounded-3xl sm:w-96 lg:w-full lg:order-1 lg:rounded-r-none'>
        <div className='mb-7 pb-7 flex items-center border-b border-gray-300'>
          <Image priority={true} src={thumbnailPrice1} alt='thumbnail price' className='rounded-3xl w-20 h-20' />
          <div className='ml-5'>
            <span className='block text-2xl font-semibold'>Basic</span>
            <span>
              <span className='font-medium text-gray-500 text-xl align-top'>$ </span>
              <span className='text-3xl font-bold'>10 </span>
            </span>
            <span className='text-gray-500 font-medium'>/ user</span>
          </div>
        </div>
        <ul className='mb-7 font-medium text-gray-500'>
          <li className='flex text-lg mb-2'>
            <Image priority={true} src={checkGrey} alt='check grey' width={24} height={28} />
            <span className='ml-3'>
              Get started with <span className='text-black'>messaging</span>
            </span>
          </li>
          <li className='flex text-lg mb-2'>
            <Image priority={true} src={checkGrey} alt='check grey' width={24} height={28} />
            <span className='ml-3'>
              Flexible <span className='text-black'>team meetings</span>
            </span>
          </li>
          <li className='flex text-lg'>
            <Image priority={true} src={checkGrey} alt='check grey' width={24} height={28} />
            <span className='ml-3'>
              <span className='text-black'>5 TB</span> cloud storage
            </span>
          </li>
        </ul>
        <Link
          href='#!'
          className='flex justify-center items-center bg-indigo-600 rounded-xl py-5 px-4 text-center text-white text-xl'
        >
          Choose Plan
          <Image priority={true} src={arrowRight} className='ml-2' alt='arrow right' />
        </Link>
      </li>

      <li className='w-full flex-1 p-8 order-1 shadow-xl rounded-3xl bg-gray-900 text-gray-400 sm:w-96 lg:w-full lg:order-2 lg:mt-0'>
        <div className='mb-8 pb-8 flex items-center border-b border-gray-600'>
          <Image priority={true} src={thumbnailPrice2} alt='thumbnail price' className='rounded-3xl w-20 h-20' />
          <div className='ml-5'>
            <span className='block text-3xl font-semibold text-white'>Startup</span>
            <span>
              <span className='font-medium text-xl align-top'>$ </span>
              <span className='text-3xl font-bold text-white'>24 </span>
            </span>
            <span className='font-medium'>/ user</span>
          </div>
        </div>
        <ul className='mb-10 font-medium text-xl'>
          <li className='flex mb-6'>
            <Image priority={true} src={checkWhite} alt='check white' width={24} height={28} />
            <span className='ml-3'>
              All features in <span className='text-white'>Basic</span>
            </span>
          </li>
          <li className='flex mb-6'>
            <Image priority={true} src={checkWhite} alt='check white' width={24} height={28} />
            <span className='ml-3'>
              Flexible <span className='text-white'>call scheduling</span>
            </span>
          </li>
          <li className='flex'>
            <Image priority={true} src={checkWhite} alt='check white' width={24} height={28} />
            <span className='ml-3'>
              <span className='text-white'>15 TB</span> cloud storage
            </span>
          </li>
        </ul>
        <Link
          href='#!'
          className='flex justify-center items-center bg-indigo-600 rounded-xl py-6 px-4 text-center text-white text-2xl'
        >
          Choose Plan
          <Image priority={true} src={arrowRight} className='ml-2' alt='arrow right' />
        </Link>
      </li>

      <li className='w-full flex-1 mt-8 p-8 order-3 bg-white shadow-xl rounded-3xl sm:w-96 lg:w-full lg:order-3 lg:rounded-l-none'>
        <div className='mb-7 pb-7 flex items-center border-b border-gray-300'>
          <Image priority={true} src={thumbnailPrice3} alt='thumbnail price' className='rounded-3xl w-20 h-20' />
          <div className='ml-5'>
            <span className='block text-2xl font-semibold'>Enterprise</span>
            <span>
              <span className='font-medium text-gray-500 text-xl align-top'>$ </span>
              <span className='text-3xl font-bold'>35 </span>
            </span>
            <span className='text-gray-500 font-medium'>/ user</span>
          </div>
        </div>
        <ul className='mb-7 font-medium text-gray-500'>
          <li className='flex text-lg mb-2'>
            <Image priority={true} src={checkGrey} alt='check grey' width={24} height={28} />
            <span className='ml-3'>
              All features in <span className='text-black'>Startup</span>
            </span>
          </li>
          <li className='flex text-lg mb-2'>
            <Image priority={true} src={checkGrey} alt='check grey' width={24} height={28} />
            <span className='ml-3'>
              Growth <span className='text-black'>oriented</span>
            </span>
          </li>
          <li className='flex text-lg'>
            <Image priority={true} src={checkGrey} alt='check grey' width={24} height={28} />
            <span className='ml-3'>
              <span className='text-black'>Unlimited</span> cloud storage
            </span>
          </li>
        </ul>
        <Link
          href='#!'
          className='flex justify-center items-center bg-indigo-600 rounded-xl py-5 px-4 text-center text-white text-xl'
        >
          Choose Plan
          <Image priority={true} src={arrowRight} className='ml-2' alt='arrow right' />
        </Link>
      </li>
    </ul>
  )
}

export default ListPrice
