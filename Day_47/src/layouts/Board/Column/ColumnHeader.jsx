import { useLayoutEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { removeColumn, editTitle, postNewColumn } from '~/helper/actionsSlice'

const ColumnHeader = ({ idColumn, title }) => {
  const titleColumn = useRef(null)
  const dispatch = useDispatch()

  const [state, setState] = useState({ title, isEditable: false })

  const handleRemoveColumn = () => {
    dispatch(removeColumn(idColumn))
    dispatch(postNewColumn())
  }

  const handleEditTitleColumn = () => {
    if (!state.title.trim()) {
      setState({ title })
      return
    }
    dispatch(editTitle({ idColumn, title: state.title }))
    dispatch(postNewColumn())
  }

  const handleInputTitleColumn = (e) => {
    const valueTitleColumn = e.target.value
    setState({ ...state, title: valueTitleColumn })
  }

  useLayoutEffect(() => {
    if (titleColumn.current) {
      titleColumn.current.style.height = 'auto'
      titleColumn.current.style.height = titleColumn.current.scrollHeight + 'px'
    }
  }, [title])

  return (
    <header className='column-header'>
      <textarea
        ref={titleColumn}
        onBlur={() => {
          if (!state.isEditable) return
          handleEditTitleColumn()
          setState({ ...state, isEditable: false })
        }}
        onInput={handleInputTitleColumn}
        onDoubleClick={() => setState({ ...state, isEditable: true })}
        readOnly={!state.isEditable}
        className='column-header__textarea'
        rows={1}
        maxLength={100}
        value={typeof state.title === 'object' ? state.title.title : state.title}
      ></textarea>
      <button onClick={handleRemoveColumn} className='btn__remove-column'>
        <span className='text'>
          <i className='fa-solid fa-trash'></i>
        </span>
      </button>
    </header>
  )
}

export default ColumnHeader
