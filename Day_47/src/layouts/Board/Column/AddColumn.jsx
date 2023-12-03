import { useDispatch } from 'react-redux'
import { useRef, useState } from 'react'
import { addColumn } from '~/helper/actionsSlice'
import clsx from 'clsx'

const AddColumn = ({ listRef }) => {
  const dispatch = useDispatch()
  const titleNewColumn = useRef()
  const [state, setState] = useState({
    valueTitleNewColumn: '',
    openFomAddColumn: 'hide'
  })

  const openFormAddNewColumn = () => {
    setState({
      ...state,
      openFomAddColumn: ''
    })
    listRef.current.scrollLeft = listRef.current.scrollWidth
  }

  const handleFocusTextarea = () => {
    if (!state.openFomAddColumn) {
      titleNewColumn.current.focus()
    }
  }

  const inputNewTitleColumn = (e) => {
    const valueTitleNewColumn = e.target.value
    setState({ ...state, valueTitleNewColumn })
  }

  const handleCancelAddColumn = () => {
    setState({
      ...state,
      openFomAddColumn: 'hide'
    })
  }

  const addNewColumn = (e) => {
    e.preventDefault()
    if (!state.valueTitleNewColumn) {
      handleCancelAddColumn()
      return
    }

    dispatch(addColumn({ title: state.valueTitleNewColumn }))
    setState({
      valueTitleNewColumn: '',
      openFomAddColumn: 'hide'
    })
  }

  return (
    <li className='column-item'>
      <div className='wrap__add-column'>
        <button onClick={openFormAddNewColumn} className='btn__add-column'>
          <span className='text'>
            <i className='fa-solid fa-table-columns'></i>
            Thêm cột mới
          </span>
        </button>
        <form
          onSubmit={addNewColumn}
          onTransitionEnd={handleFocusTextarea}
          onBlur={handleCancelAddColumn}
          className={clsx('form__add-column', state.openFomAddColumn)}
          action='post'
        >
          <textarea
            ref={titleNewColumn}
            onInput={inputNewTitleColumn}
            className='textarea__add-column'
            rows='1'
            maxLength={100}
            value={state.valueTitleNewColumn}
            placeholder='Nhập tiêu đề cho cột mới'
          ></textarea>
          <div className='wrap__action'>
            <button className='btn__add-column'>
              <span className='text'>
                <i className='fa-solid fa-plus'></i>
                Thêm cột
              </span>
            </button>
            <button onClick={handleCancelAddColumn} type='button' className='btn-cancel__add-column'>
              <span className='text'>
                <i className='fa-solid fa-xmark'></i>
              </span>
            </button>
          </div>
        </form>
      </div>
    </li>
  )
}

export default AddColumn
