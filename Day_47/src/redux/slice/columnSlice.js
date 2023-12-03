import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  list: JSON.parse(localStorage.getItem('columnState')) ?? []
}

export const columnSlice = createSlice({
  name: 'column',
  initialState,
  reducers: {
    addColumn: (state, action) => {
      action.payload.idColumn = Date.now()
      action.payload.listCard = []
      state.list.push(action.payload)
    },

    removeColumn: (state, action) => {
      state.list = state.list.filter((column) => column.idColumn !== action.payload)
    },

    editTitle: (state, action) => {
      state.list.forEach((column) => {
        if (column.idColumn === action.payload.idColumn) {
          column.title = action.payload.title
        }
      })
    },

    addCard: (state, action) => {
      action.payload.card.idCard = Date.now()

      state.list.forEach((column) => {
        if (column.idColumn === action.payload.idColumn) {
          column.listCard.push(action.payload.card)
        }
      })
    },
    removeCard: (state, action) => {
      state.list.forEach((column) => {
        if (column.idColumn === action.payload.idColumn) {
          column.listCard.forEach((card, index) => {
            if (card.idCard === action.payload.idCard) {
              column.listCard.splice(index, 1)
            }
          })
        }
      })
    },
    editCard: (state, action) => {
      state.list.forEach((column) => {
        if (column.idColumn === action.payload.idColumn) {
          column.listCard.forEach((card) => {
            if (card.idCard === action.payload.idCard) {
              card.content = action.payload.newContentCard
            }
          })
        }
      })
    }
  }
})
