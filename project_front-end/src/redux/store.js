import { mindmapSlice } from './slice/mindmapSlice'
import { mindmapApi } from './services/mindmapApi'
import { authSlice } from './slice/authSlice'

import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { setCookie } from '@/utils/handleCookie'
import { modalSlice } from './slice/modalSlice'
import { mindmapShare } from './services/mindmapShare'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    mindmap: mindmapSlice.reducer,
    modal: modalSlice.reducer,
    [mindmapApi.reducerPath]: mindmapApi.reducer,
    [mindmapShare.reducerPath]: mindmapShare.reducer
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => {
    return [...getDefaultMiddleware(), mindmapApi.middleware, mindmapShare.middleware]
  }
})

setupListeners(store.dispatch)

store.subscribe(() => {
  const listMindmap = store.getState().mindmap.listMindmap
  setCookie('listMindmap', listMindmap)
})
