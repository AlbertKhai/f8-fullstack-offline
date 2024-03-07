import ModalConfirm from '@/components/Modals/ModalConfirm'
import { mindmapApi } from '@/redux/services/mindmapApi'
import { setOpenModal } from '@/redux/slice/modalSlice'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { TrashIcon } from '@heroicons/react/24/outline'

import Link from 'next/link'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const BtnEditMindmap = ({ idMindmap, title, onLoading }) => {
  const [updateMindmap, result] = mindmapApi.useUpdateMindmapMutation()

  const listMindmap = useSelector(({ mindmap }) => mindmap.listMindmap)
  const subUser = useSelector(({ auth }) => auth.user?.sub)

  const dispatch = useDispatch()

  const handleDelMindmap = () => {
    const body = { listMindmap: listMindmap.filter(({ id }) => id !== idMindmap) }
    updateMindmap({ subUser, body })
  }

  useEffect(() => {
    onLoading(result.isLoading)
  }, [result])

  return (
    <div className='w-1/4'>
      <Link href={`/mindmap/${idMindmap}`}>
        <span className='text-gray-600 text-sm px-2'>
          <FontAwesomeIcon icon={faPenToSquare} />
        </span>
      </Link>
      <button
        onClick={() => dispatch(setOpenModal({ modalName: 'confirm', value: true }))}
        className='text-gray-600 text-sm px-2'
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
      <ModalConfirm
        icon={<TrashIcon className='h-6 w-6 text-red-600' aria-hidden='true' />}
        handleActionYes={handleDelMindmap}
      >{`Bạn chắc chắn xoá mindmap: "${title}" này không?`}</ModalConfirm>
    </div>
  )
}

export default BtnEditMindmap
