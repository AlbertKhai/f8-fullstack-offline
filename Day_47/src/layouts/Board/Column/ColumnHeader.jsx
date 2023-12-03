import { useLayoutEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { removeColumn } from '~/helper/actionsSlice'

const ColumnHeader = ({ idColumn, title, handleEditTitleColumn, handleInputTitleColumn }) => {
  const titleColumn = useRef(null)
  const dispatch = useDispatch()

  const handleRemoveColumn = () => {
    dispatch(removeColumn(idColumn))
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
        onBlur={handleEditTitleColumn}
        onInput={handleInputTitleColumn}
        className='column-header__textarea'
        rows={1}
        maxLength={100}
        value={title}
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
