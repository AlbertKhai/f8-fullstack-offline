import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  list: []
}
export const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    toastAdd: (state, action) => {
      action.payload.id = Date.now()
      action.payload.type += '-toast'
      state.list.push(action.payload)
    },
    toastRemove: (state, action) => {
      state.list = state.list.filter((item) => item.id !== action.payload)
    }
  }
})
