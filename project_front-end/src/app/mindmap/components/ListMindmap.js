'use client'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import moment from 'moment'
import Link from 'next/link'
import { useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { mindmapApi } from '@/redux/services/mindmapApi'
import { initiateMindmap } from '@/redux/slice/mindmapSlice'

import BtnEditMindmap from './BtnEditMindmap'

const ListMindmap = ({ user }) => {
  const dispatch = useDispatch()
  const subUser = user?.sub || ''
  const { data, isLoading, error } = mindmapApi.useGetMindmapQuery(subUser)
  const [addUser, result] = mindmapApi.useAddUserMutation()

  const [listMindmap, setListMindmap] = useState([])

  useLayoutEffect(() => {
    if (data) {
      if (listMindmap.length === 0 || listMindmap.length > data.length) {
        setListMindmap(data)
        dispatch(initiateMindmap(data))
      }
    }

    if (data === undefined) {
      addUser({
        id: subUser,
        listMindmap: []
      })
    }
  }, [data])

  if (isLoading) {
    return (
      <div className='text-center py-7'>
        <FontAwesomeIcon icon={faSpinner} spin /> Loading...
      </div>
    )
  }

  return (
    <>
      {listMindmap?.map(({ id: idMindmap, title, desc, createdAt }) => (
        <div key={idMindmap} className='hover:bg-gray-200 cursor-pointer bg-white shadow flex items-center mb-5 py-2 rounded-lg'>
          <div className='w-1/6 text-center'>
            <input type='checkbox' />
          </div>

          <div className='w-1/2'>
            <div className='flex items-center'>
              <div className='ml-4'>
                <span className='capitalize block text-gray-800'>
                  <Link href={`/mindmap/${idMindmap}`}>{title}</Link>
                </span>
                <span className='text-sm block text-gray-600'>{desc}</span>
              </div>
            </div>
          </div>

          <div className='w-1/4'>
            <span className='text-gray-600 text-sm'>{moment(createdAt).format('DD/MM/YYYY HH:mm:ss')}</span>
          </div>
          <BtnEditMindmap idMindmap={idMindmap} />
        </div>
      ))}
    </>
  )
}

export default ListMindmap
