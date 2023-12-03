import { useEffect, useRef } from 'react'
import TextareaAutosize from 'react-textarea-autosize'

const AddCard = ({ addingCard, handleInputNewCard, addNewCard, newCardValue }) => {
  const newCard = useRef(null)

  useEffect(() => {
    if (!newCardValue && addingCard) {
      newCard.current.focus()
    }
  }, [addingCard, newCardValue])

  return addingCard ? (
    <li className='card-item'>
      <TextareaAutosize
        ref={newCard}
        onInput={handleInputNewCard}
        onBlur={addNewCard}
        maxRows={3}
        className='card-item__textarea'
        value={newCardValue}
        placeholder='Nhập nội dung cho thẻ mới'
      />
    </li>
  ) : null
}

export default AddCard
