import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addCard, postNewColumn } from '~/helper/actionsSlice'

import ColumnHeader from './ColumnHeader'
import CardList from '../Card/CardList'
import AddCard from '../ActionBoard/AddCard'
import ColumnFooter from './ColumnFooter'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

const Column = (props) => {
  const { idColumn, title, listCard } = props
  const dispatch = useDispatch()
  const [state, setState] = useState({
    addingCard: false,
    newCard: '',
    ignoreBlur: false
  })

  const handleInputNewCard = (e) => {
    const valueNewCard = e.target.value
    setState({ ...state, newCard: valueNewCard })
  }

  const openAddNewCard = () => {
    setState({ ...state, addingCard: true })
  }

  const addNewCardViaBtn = () => {
    if (state.newCard) {
      dispatch(addCard({ idColumn, card: { content: state.newCard } }))
      dispatch(postNewColumn())
      setState({ ...state, newCard: '', ignoreBlur: true })
    } else {
      setState({ ...state, addingCard: false, ignoreBlur: true })
    }
  }

  const addNewCardViaBlur = () => {
    if (!state.ignoreBlur) {
      if (state.newCard) {
        dispatch(addCard({ idColumn, card: { content: state.newCard } }))
        dispatch(postNewColumn())
        setState({ ...state, addingCard: false, newCard: '' })
      } else {
        setState({ ...state, addingCard: false })
      }
    }
  }

  const handleCancelAddCard = () => {
    setState({ ...state, addingCard: false, newCard: '', ignoreBlur: true })
  }

  useEffect(() => {
    if (state.ignoreBlur) {
      setState({ ...state, ignoreBlur: false })
    }
  }, [state])

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: idColumn,
    data: { ...props }
  })

  const dndKitColumnStyles = {
    touchAction: 'none',
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : null
  }

  return (
    <li className='column-item' ref={setNodeRef} style={dndKitColumnStyles} {...attributes}>
      <div className='column-inner' {...listeners}>
        <ColumnHeader title={title} idColumn={idColumn} />
        <CardList addingCard={state.addingCard} listCard={listCard}>
          <AddCard
            addingCard={state.addingCard}
            onInputNewCard={handleInputNewCard}
            addNewCard={addNewCardViaBlur}
            newCardValue={state.newCard}
            ignoreBlur={state.ignoreBlur}
          />
        </CardList>
        <ColumnFooter
          addingCard={state.addingCard}
          addNewCard={addNewCardViaBtn}
          onCancelAddCard={handleCancelAddCard}
          onOpenAddNewCard={openAddNewCard}
        />
      </div>
    </li>
  )
}

export default Column
