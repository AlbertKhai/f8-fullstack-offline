import { mindmapApi } from '@/redux/services/mindmapApi'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { useSelector } from 'react-redux'

const BtnEditMindmap = ({ idMindmap }) => {
  const listMindmap = useSelector(({ mindmap }) => mindmap.listMindmap)
  const subUser = useSelector(({ auth }) => auth.user?.sub)
  const [updateMindmap, result] = mindmapApi.useUpdateMindmapMutation()

  const handleDelMindmap = () => {
    const body = { listMindmap: listMindmap.filter(({ id }) => id !== idMindmap) }
    updateMindmap({ subUser, body })
  }

  return (
    <div className='w-1/4'>
      <Link href={`/mindmap/${idMindmap}`}>
        <span className='text-gray-600 text-sm px-2'>
          <FontAwesomeIcon icon={faPenToSquare} />
        </span>
      </Link>
      <button onClick={handleDelMindmap} className='text-gray-600 text-sm px-2'>
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  )
}

export default BtnEditMindmap
