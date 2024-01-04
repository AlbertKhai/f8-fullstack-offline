'use client'
import { faShare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import ModalShare from './ModalShare/ModalShare'

const cssBtn = 'border-2 duration-200 ease inline-flex items-center mb-1 mr-1 transition py-1 px-2 text-sm rounded text-white'

const BtnShareMindmap = () => {
  const [openModalShare, setOpenModalShare] = useState(false)

  const handleOpenModalShare = (value) => {
    setOpenModalShare(value)
  }

  return (
    <>
      <button
        onClick={() => handleOpenModalShare(true)}
        className={cssBtn + ' border-blue-600 bg-blue-600 hover:bg-blue-700 hover:border-blue-700'}
      >
        <FontAwesomeIcon icon={faShare} />
        <span className='ml-2'>Chia sẻ</span>
      </button>
      <ModalShare isOpen={openModalShare} onOpen={handleOpenModalShare} />
    </>
  )
}

export default BtnShareMindmap
