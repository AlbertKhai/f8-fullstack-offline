import { cloneDeep, isEmpty } from 'lodash'

export const findColumnByCard = (listColumn, ofIdColumn) => {
  return listColumn?.find((column) => column.idColumn === ofIdColumn)
}

export const createCardPlaceholder = (idColumn) => ({
  idCard: `card-placeholder__${idColumn}`,
  ofIdColumn: idColumn,
  content: '',
  placeholder: true
})

export const moveCardBetweenColumn = (
  active,
  over,
  activeColumn,
  overColumn,
  idCardDragging,
  idCardOver,
  dataCardDragging,
  dataCardOver,
  listColumn,
  dispatch,
  updateColumn
) => {
  const indexCardOver = overColumn?.listCard?.findIndex(({ idCard }) => idCard === idCardOver)

  const isBelowOverItem = active.rect.current.translated && active.rect.current.translated.top > over.rect.top + over.rect.height

  const modifier = isBelowOverItem ? 1 : 0

  let newIndexCard = indexCardOver >= 0 ? indexCardOver + modifier : overColumn?.listCard?.length + 1

  const newListColumn = cloneDeep(listColumn)

  const newActiveColumn = newListColumn.find(({ idColumn }) => idColumn === activeColumn.idColumn)
  const newOverColumn = newListColumn.find(({ idColumn }) => idColumn === overColumn.idColumn)

  if (newActiveColumn) {
    newActiveColumn.listCard = newActiveColumn.listCard.filter(({ idCard }) => idCard !== idCardDragging)
    if (isEmpty(newActiveColumn.listCard)) {
      newActiveColumn.listCard = [createCardPlaceholder(newActiveColumn.idColumn)]
    }
  }

  if (newOverColumn) {
    newOverColumn.listCard = newOverColumn.listCard.filter(({ idCard }) => idCard !== idCardDragging)
    dataCardDragging.ofIdColumn = dataCardOver?.ofIdColumn
    newOverColumn.listCard = newOverColumn.listCard.toSpliced(newIndexCard, 0, dataCardDragging)
    newOverColumn.listCard = newOverColumn.listCard.filter((card) => !card?.placeholder)
  }

  dispatch(updateColumn(newListColumn))
}
