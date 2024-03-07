'use client'
import './btnSwitch.scss'

const BtnSwitch = ({ isShare, onShare }) => {
  return (
    <>
      <input type='checkbox' id='lock' hidden onChange={() => onShare(!isShare)} checked={isShare} />
      <label
        htmlFor='lock'
        className='lock-label w-[45px] h-[45px] flex items-center justify-center bg-[rgb(80,80,80)] cursor-pointer transition-all duration-[0.3s] rounded-[15px] active:scale-90'
      >
        <span className='lock-wrapper w-fit h-fit flex flex-col items-center justify-center rotate-[-10deg]'>
          <span className='shackle bg-transparent h-[9px] w-3.5 transition-all duration-[0.3s] rounded-t-[10px] border-t-[3px] border-t-[white] border-x-[3px] border-x-[white] border-solid' />
          <svg
            className='lock-body w-[15px]'
            width={15}
            height={15}
            viewBox='0 0 28 28'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M0 5C0 2.23858 2.23858 0 5 0H23C25.7614 0 28 2.23858 28 5V23C28 25.7614 25.7614 28 23 28H5C2.23858 28 0 25.7614 0 23V5ZM16 13.2361C16.6137 12.6868 17 11.8885 17 11C17 9.34315 15.6569 8 14 8C12.3431 8 11 9.34315 11 11C11 11.8885 11.3863 12.6868 12 13.2361V18C12 19.1046 12.8954 20 14 20C15.1046 20 16 19.1046 16 18V13.2361Z'
              fill='white'
            />
          </svg>
        </span>
      </label>
    </>
  )
}

export default BtnSwitch
