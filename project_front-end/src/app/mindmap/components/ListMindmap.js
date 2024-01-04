'use client'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useLayoutEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { mindmapApi } from '@/redux/services/mindmapApi'
import { initiateMindmap } from '@/redux/slice/mindmapSlice'

import ItemMindmap from './ItemMindmap'

const ListMindmap = ({ user }) => {
  const dispatch = useDispatch()
  const subUser = user?.sub || ''
  const { data, isLoading, error } = mindmapApi.useGetMindmapQuery(subUser)
  const [addUser, result] = mindmapApi.useAddUserMutation()
  const [loading, setLoading] = useState(true)
  const [listMindmap, setListMindmap] = useState([])

  useLayoutEffect(() => {
    if (isLoading) return

    if (data) {
      if (listMindmap.length === 0 || listMindmap.length > data.length) {
        setListMindmap(data)
        setLoading(false)
        dispatch(initiateMindmap(data))
      }
    }

    if (data === undefined) {
      addUser({
        id: subUser,
        listMindmap: []
      })
    }
  }, [data, isLoading])

  if (loading) {
    return (
      <div className='text-center py-7'>
        <FontAwesomeIcon icon={faSpinner} spin /> Loading...
      </div>
    )
  }

  return (
    <>
      {listMindmap.length ? (
        listMindmap?.map((mindmap) => <ItemMindmap key={mindmap.id} {...mindmap} />)
      ) : (
        <p className='bg-white text-center text-xl font-medium mb-5 py-4 rounded-lg'>
          Danh sách trống, hãy thử tạo mindmap mới nhé
        </p>
      )}
    </>
  )
}

export default ListMindmap
