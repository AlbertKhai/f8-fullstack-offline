import { useState } from 'react'
import { useDispatch } from 'react-redux'
import TextareaAutosize from 'react-textarea-autosize'
import { editCard } from '~/helper/actionsSlice'
import { removeCard } from '~/helper/actionsSlice'

const Card = ({ idColumn, card }) => {
  const dispatch = useDispatch()
  const { idCard, content } = card
  const [state, setState] = useState({ content })

  const handleEditCard = (e) => {
    const newContentCard = e.target.value
    setState({ content: newContentCard })
  }

  const handleRemoveCard = () => {
    dispatch(removeCard({ idColumn, idCard }))
  }

  const updateCard = () => {
    if (!state.content.trim().length) {
      setState({ content })
      return
    }
    dispatch(editCard({ idColumn, idCard, newContentCard: state.content }))
  }

  return (
    <li className='card-item'>
      <TextareaAutosize
        onInput={handleEditCard}
        onBlur={updateCard}
        maxRows={3}
        className='card-item__textarea'
        value={state.content}
      />
      <button onClick={handleRemoveCard} className='btn__remove-card'>
        <span className='text'>
          <i className='fa-regular fa-trash-can'></i>
        </span>
      </button>
    </li>
  )
}

export default Card
