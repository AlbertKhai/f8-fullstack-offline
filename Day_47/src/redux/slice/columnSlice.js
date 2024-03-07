import { createSlice } from '@reduxjs/toolkit'
import { getTrelloMiddleWare } from '../middlewares/getTrelloMiddleware'
import { formatDataForClient } from '~/helper/formatDataServer'
import { postTaskMiddleware } from '../middlewares/postTasksMiddleware'

const initialState = {
  list: [],
  pending: false,
  change: 0,
  updateError: false
}

export const columnSlice = createSlice({
  name: 'column',
  initialState,
  reducers: {
    addColumn: (state, action) => {
      action.payload.idColumn = `id-column-${state.list.length + 1}`
      action.payload.listCard = [
        {
          idCard: `card-placeholder__${action.payload.idColumn}`,
          ofIdColumn: action.payload.idColumn,
          content: '',
          placeholder: true
        }
      ]
      state.list.push(action.payload)
    },

    removeColumn: (state, action) => {
      state.list = state.list.filter((column) => column.idColumn !== action.payload)
    },

    updateColumn: (state, action) => {
      state.list = action.payload
    },

    editTitle: (state, action) => {
      state.list.forEach((column) => {
        if (column.idColumn === action.payload.idColumn) {
          column.title = action.payload.title
        }
      })
    },

    addCard: (state, action) => {
      state.list.forEach((column) => {
        if (column.idColumn === action.payload.idColumn) {
          action.payload.card.idCard = `id-card-${column.listCard.length + 1}__${Date.now()}`
          action.payload.card.ofIdColumn = column.idColumn
          action.column = column.title
          column.listCard.push(action.payload.card)
        }
      })
    },

    removeCard: (state, action) => {
      state.list.forEach((column) => {
        if (column.idColumn === action.payload.ofIdColumn) {
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
        if (column.idColumn === action.payload.ofIdColumn) {
          column.listCard.forEach((card) => {
            if (card.idCard === action.payload.idCard) {
              card.content = action.payload.newContentCard
            }
          })
        }
      })
    },

    updateCard: (state, action) => {
      state.list.forEach((column) => {
        if (column.idColumn === action.payload.ofIdColumn) {
          column.listCard = action.payload.newListCard
        }
      })
    },

    postNewColumn: (state) => {
      state.change++
    },
    resetColumn: (state) => {
      state.list = []
      state.pending = false
      state.change = 0
      state.updateError = false
    }
  },

  extraReducers: (builder) => {
    builder.addCase(getTrelloMiddleWare.pending, (state) => {
      state.pending = true
    })
    builder.addCase(getTrelloMiddleWare.fulfilled, (state, action) => {
      state.list = formatDataForClient(action.payload)
      state.pending = false
    })
    builder.addCase(getTrelloMiddleWare.rejected, (state) => {
      state.list = []
      state.pending = false
    })
    builder.addCase(postTaskMiddleware.pending, (state) => {
      state.updateError = false
    })
    builder.addCase(postTaskMiddleware.fulfilled, (state) => {
      state.updateError = false
    })
    builder.addCase(postTaskMiddleware.rejected, (state) => {
      state.updateError = true
      state.list = []
    })
  }
})
