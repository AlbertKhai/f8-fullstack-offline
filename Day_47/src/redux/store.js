import { configureStore } from '@reduxjs/toolkit'
import { toastSlice } from './slice/toastSlice'
import { loadingSlice } from './slice/loadingSlice'
import { columnSlice } from './slice/columnSlice'

export const store = configureStore({
  reducer: {
    toast: toastSlice.reducer,
    loading: loadingSlice.reducer,
    column: columnSlice.reducer
  }
})

store.subscribe(() => {
  localStorage.setItem('columnState', JSON.stringify(store.getState().column.list))
})
