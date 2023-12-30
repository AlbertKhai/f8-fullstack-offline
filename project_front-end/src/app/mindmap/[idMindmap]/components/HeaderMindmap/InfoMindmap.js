'use client'

import { updateItemMindmap } from '@/redux/slice/mindmapSlice'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const InfoMindmap = ({ idMindmap }) => {
  const initMindmap = useSelector(({ mindmap }) => mindmap.listMindmap.find(({ id }) => id === idMindmap))
  const statusMindmap = useSelector(({ mindmap }) => mindmap.statusMindmap)
  const dispatch = useDispatch()

  const [state, setState] = useState({ title: initMindmap?.title, desc: initMindmap?.desc })

  const addContentEditable = ({ target }) => {
    target.contentEditable = true
    target.focus()
  }

  const removeContentEditable = ({
    target: {
      contentEditable,
      innerText,
      dataset: { type }
    }
  }) => {
    contentEditable = false
    innerText !== state[type] && setState({ ...state, [type]: innerText })
  }

  useEffect(() => {
    if (statusMindmap === 'updatedItemMindmap') {
      dispatch(updateItemMindmap({ idMindmap, data: state, status: 'updated' }))
      return
    }
  }, [statusMindmap])

  return (
    <div className='w-4/5'>
      <h1
        onBlur={removeContentEditable}
        onClick={addContentEditable}
        className='text-2xl md:text-4xl font-medium my-2 outline-0'
        spellCheck='false'
        data-type='title'
      >
        {state?.title}
      </h1>
      <p data-type='desc' onBlur={removeContentEditable} onClick={addContentEditable} className='outline-0' spellCheck='false'>
        {state?.desc}
      </p>
    </div>
  )
}

export default InfoMindmap
