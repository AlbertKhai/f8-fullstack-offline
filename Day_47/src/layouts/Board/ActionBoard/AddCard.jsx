import { useEffect, useRef } from 'react'
import TextareaAutosize from 'react-textarea-autosize'

const AddCard = ({ addingCard, onInputNewCard, addNewCard, newCardValue }) => {
  const newCard = useRef(null)

  const handleOnBlur = () => {
    addNewCard()
    if (addingCard) newCard.current.focus()
  }

  useEffect(() => {
    newCard.current && newCard.current.focus()
  }, [addingCard])

  return addingCard ? (
    <li className='card-item'>
      <div className='card-item__inner'>
        <div className='wrap-textarea'>
          <TextareaAutosize
            ref={newCard}
            onInput={onInputNewCard}
            onBlur={handleOnBlur}
            minRows={3}
            className='card-item__textarea'
            value={newCardValue}
            placeholder='Nhập nội dung cho thẻ mới'
          />
        </div>
      </div>
    </li>
  ) : null
}

export default AddCard
