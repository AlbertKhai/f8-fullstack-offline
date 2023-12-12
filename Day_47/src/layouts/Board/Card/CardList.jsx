import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useEffect, useRef, useState, useLayoutEffect } from 'react'
import Card from './Card'
import clsx from 'clsx'

const CardList = (props) => {
  const { addingCard, listCard, children } = props
  const [isOverflowing, setIsOverflowing] = useState(false)
  const cardList = useRef(null)
  const lengthCardRef = useRef(listCard?.length)

  useLayoutEffect(() => {
    if (cardList.current) {
      setIsOverflowing(cardList.current.scrollHeight > cardList.current.clientHeight)
    }
  }, [listCard])

  useEffect(() => {
    if (cardList.current && (listCard.length > lengthCardRef.current || addingCard)) {
      cardList.current.scrollTop = cardList.current.scrollHeight
      lengthCardRef.current = listCard.length
    }
  }, [listCard, addingCard])

  if (!listCard?.length && !addingCard) return

  return (
    <SortableContext items={listCard?.map((card) => card.idCard)} strategy={verticalListSortingStrategy}>
      <ul ref={cardList} className={clsx(isOverflowing && 'overflowing', 'card-list')}>
        {listCard?.map((card) => (
          <Card key={card.idCard} {...card} />
        ))}
        {children}
      </ul>
    </SortableContext>
  )
}

export default CardList
