import { isEmpty } from 'lodash'

export const formatDataForClient = (data) => {
  const { columns, tasks } = data
  return columns.map(({ column, columnName: title }) => {
    let listCard = tasks.reduce((prev, { _id: idCard, column: ofIdColumn, content }) => {
      if (!content.length) return prev
      if (column === ofIdColumn) {
        return [...prev, { idCard, content, ofIdColumn: column }]
      }
      return prev
    }, [])

    if (isEmpty(listCard)) {
      listCard = [{ idCard: `card-placeholder__${column}`, ofIdColumn: column, content: '', placeholder: true }]
    }

    return {
      idColumn: column,
      title,
      listCard
    }
  })
}

export const formatDataForServer = (listColumn) => {
  return listColumn.reduce((prev, { idColumn, title, listCard }) => {
    const cards = listCard.map(({ content }) => {
      return { column: idColumn, content, columnName: title }
    })

    return [...prev, ...cards]
  }, [])
}
