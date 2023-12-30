'use client'
import { mindmapApi } from '@/redux/services/mindmapApi'
import { updateItemMindmap } from '@/redux/slice/mindmapSlice'
import { faFloppyDisk, faShare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const cssBtn = 'border-2 duration-200 ease inline-flex items-center mb-1 mr-1 transition py-1 px-2 text-sm rounded text-white'

const BtnHeaderMindmap = () => {
  const dispatch = useDispatch()
  const listMindmap = useSelector(({ mindmap }) => mindmap.listMindmap)
  const statusMindmap = useSelector(({ mindmap }) => mindmap.statusMindmap)
  const subUser = useSelector(({ auth }) => auth.user?.sub)
  const [updateMindmap, result] = mindmapApi.useUpdateMindmapMutation()

  const handleSave = () => {
    dispatch(updateItemMindmap({ status: 'updating' }))
  }

  useEffect(() => {
    if (statusMindmap === 'updated') {
      ;(async () => {
        try {
          const res = await updateMindmap({ subUser, body: { listMindmap } })
          if (res.error) throw new Error('Lưu không thành công, bạn vui lòng thử lại nhé')
          toast.success('Đã lưu thành công')
        } catch (error) {
          toast.error(error.message)
        }
      })()
      dispatch(updateItemMindmap({ status: 'idle' }))
    }
  }, [statusMindmap])

  return (
    <div className='w-1/5'>
      <div className='flex justify-end items-center'>
        <button
          onClick={handleSave}
          className={cssBtn + ' border-green-600 bg-green-600 hover:bg-green-700 hover:border-green-700'}
        >
          <FontAwesomeIcon icon={faFloppyDisk} />
          <span className='ml-2'>Lưu thay đổi</span>
        </button>
        <button className={cssBtn + ' border-blue-600 bg-blue-600 hover:bg-blue-700 hover:border-blue-700'}>
          <FontAwesomeIcon icon={faShare} />
          <span className='ml-2'>Chia sẻ</span>
        </button>
      </div>
    </div>
  )
}

export default BtnHeaderMindmap
