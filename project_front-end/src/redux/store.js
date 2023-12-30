import { mindmapSlice } from './slice/mindmapSlice'
import { mindmapApi } from './services/mindmapApi'
import { authSlice } from './slice/authSlice'

import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { setCookie } from '@/utils/handleCookie'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    mindmap: mindmapSlice.reducer,
    [mindmapApi.reducerPath]: mindmapApi.reducer
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => {
    return [...getDefaultMiddleware(), mindmapApi.middleware]
  }
})

setupListeners(store.dispatch)

store.subscribe(() => {
  const listMindmap = store.getState().mindmap.listMindmap
  setCookie('listMindmap', listMindmap)
})
