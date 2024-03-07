import { useState } from 'react'
import { useDispatch } from 'react-redux'
import TextareaAutosize from 'react-textarea-autosize'

import { editCard, postNewColumn, removeCard } from '~/helper/actionsSlice'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

const Card = (props) => {
  const { idCard, content, ofIdColumn } = props
  const dispatch = useDispatch()
  const [state, setState] = useState({ content, isEditable: false })

  const handleInputCard = (e) => {
    const newContentCard = e.target.value
    setState({ ...state, content: newContentCard })
  }

  const handleRemoveCard = () => {
    dispatch(removeCard({ ofIdColumn, idCard }))
    dispatch(postNewColumn())
  }

  const handleEditCard = () => {
    if (!state.content.trim().length) {
      setState({ content })
      return
    }

    dispatch(editCard({ ofIdColumn, idCard, newContentCard: state.content }))
    dispatch(postNewColumn())
  }

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: idCard,
    data: { ...props }
  })

  const dndKitCardStyles = {
    touchAction: 'none',
    transform: CSS.Translate.toString(transform),
    transition,
    borderColor: isDragging ? '#05cfff' : null,
    display: props?.placeholder ? 'none' : 'block'
  }

  const cardInnerStyles = {
    opacity: isDragging ? 0.4 : null,
    color: isDragging ? '#05cfff' : null
  }

  return (
    <li className='card-item' ref={setNodeRef} style={dndKitCardStyles} {...attributes} {...listeners}>
      <div className='card-item__inner' style={cardInnerStyles}>
        <div className='wrap-textarea'>
          <TextareaAutosize
            onInput={handleInputCard}
            onBlur={() => {
              handleEditCard()
              setState({ ...state, isEditable: false })
            }}
            readOnly={!state.isEditable}
            onDoubleClick={() => setState({ ...state, isEditable: true })}
            minRows={3}
            className='card-item__textarea'
            value={state.content}
          />
        </div>
      </div>
      <div className='wrap-btn__remove-card'>
        <button onClick={handleRemoveCard} className='btn__remove-card'>
          <span className='text'>
            <i className='fa-solid fa-xmark'></i>
          </span>
        </button>
      </div>
    </li>
  )
}

export default Card
