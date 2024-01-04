'use client'
import { mindmapApi } from '@/redux/services/mindmapApi'
import { createMindmap } from '@/redux/slice/mindmapSlice'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { v4 as uuid_v4 } from 'uuid'

const BtnCreateMindmap = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const [postMindmap, result] = mindmapApi.usePostMindmapMutation()
  const listMindmap = useSelector(({ mindmap }) => mindmap.listMindmap)
  const subUser = useSelector(({ auth }) => auth.user?.sub)

  const handleCreateMindmap = async () => {
    const id = uuid_v4()
    const newMindmap = {
      id,
      title: 'Mindmap chưa có tên',
      desc: 'Chưa có mô tả',
      createdAt: new Date().toISOString(),
      initialNodes: [
        {
          id: '0',
          type: 'customNode',
          data: { label: 'My Mindmap' },
          position: { x: 0, y: 0 },
          deletable: false
        }
      ],
      initialEdges: []
    }
    const body = { listMindmap: [...listMindmap, newMindmap] }

    try {
      const res = await postMindmap({ subUser, body })
      if (res.error) throw new Error('Tạo mindmap mới không thành công, bạn vui lòng thử lại nhé')
      dispatch(createMindmap(newMindmap))
      router.push(`/mindmap/${id}`)
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className='py-4'>
      <button
        onClick={handleCreateMindmap}
        className='rounded-lg px-4 py-2 bg-blue-500 text-blue-100 hover:bg-blue-600 duration-300'
      >
        Thêm mới
      </button>
    </div>
  )
}

export default BtnCreateMindmap
