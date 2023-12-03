import { useEffect, useRef } from 'react'
import Card from './Card'

const CardList = ({ addingCard, listCard, idColumn, children }) => {
  const cardList = useRef(null)

  useEffect(() => {
    if (cardList.current) {
      cardList.current.scrollTop = cardList.current.scrollHeight
    }
  }, [listCard])

  if (!listCard.length && !addingCard) return

  return (
    <ul ref={cardList} className='card-list'>
      {listCard.map((card) => (
        <Card key={card.idCard} idColumn={idColumn} card={card} />
      ))}
      {children}
    </ul>
  )
}

export default CardList
