import { useState } from 'react'
import { editTitle } from '~/helper/actionsSlice'
import { useDispatch } from 'react-redux'
import { addCard } from '~/helper/actionsSlice'

import ColumnHeader from './ColumnHeader'
import CardList from '../Card/CardList'
import AddCard from '../Card/AddCard'
import ColumnFooter from './ColumnFooter'

const Column = ({ idColumn, title, listCard }) => {
  const dispatch = useDispatch()
  const [state, setState] = useState({
    title,
    addingCard: false,
    newCard: '',
    added: false
  })

  const handleEditTitleColumn = () => {
    if (!state.title.trim().length) {
      setState({ ...state, title })
      return
    }
    dispatch(editTitle({ idColumn, title: state }))
  }

  const handleInputTitleColumn = (e) => {
    const valueTitleColumn = e.target.value
    setState({ ...state, title: valueTitleColumn })
  }

  const handleInputNewCard = (e) => {
    const valueNewCard = e.target.value
    setState({ ...state, newCard: valueNewCard })
  }

  const handleAddNewCard = () => {
    setState({ ...state, addingCard: true })
  }

  const addNewCard = (e) => {
    const hasValue = state.newCard.trim().length
    const isBtn = e.relatedTarget

    if (hasValue) {
      dispatch(addCard({ idColumn, card: { content: state.newCard } }))
      if (isBtn) {
        setState({ ...state, newCard: '', added: true })
      } else {
        handleCancelAddCard()
      }
    } else if (isBtn) {
      setState({ ...state, addingCard: false, added: false })
    } else {
      state.added ? setState({ ...state, added: false }) : setState({ ...state, addingCard: false })
    }
  }

  const handleCancelAddCard = () => {
    setState({ ...state, newCard: '', addingCard: false })
  }

  return (
    <li className='column-item'>
      <ColumnHeader
        title={state.title}
        idColumn={idColumn}
        handleEditTitleColumn={handleEditTitleColumn}
        handleInputTitleColumn={handleInputTitleColumn}
      />
      <CardList addingCard={state.addingCard} listCard={listCard} idColumn={idColumn}>
        <AddCard
          addingCard={state.addingCard}
          handleInputNewCard={handleInputNewCard}
          addNewCard={addNewCard}
          newCardValue={state.newCard}
        />
      </CardList>
      <ColumnFooter
        addingCard={state.addingCard}
        addNewCard={addNewCard}
        handleCancelAddCard={handleCancelAddCard}
        handleAddNewCard={handleAddNewCard}
      />
    </li>
  )
}

export default Column
