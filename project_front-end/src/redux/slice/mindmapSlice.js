import { getCookie } from '@/utils/handleCookie'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  listMindmap: getCookie('listMindmap') || [],
  statusMindmap: 'idle',
  share: {}
}

export const mindmapSlice = createSlice({
  name: 'mindmap',
  initialState,
  reducers: {
    initiateMindmap: (state, action) => {
      state.listMindmap = action.payload
    },
    createMindmap: (state, action) => {
      state.listMindmap.push(action.payload)
    },
    resetMindmap: (state, action) => {
      state.listMindmap = []
    },
    updateItemMindmap: (state, action) => {
      const { idMindmap, data, status } = action.payload
      const index = state.listMindmap.findIndex((mindmap) => mindmap.id === idMindmap)
      if (index !== -1) {
        state.listMindmap[index] = { ...state.listMindmap[index], ...data }
      }

      state.statusMindmap = status || state.statusMindmap
    },
    shareMindmap: (state, action) => {
      state.share = action.payload
    }
  }
})

export const { initiateMindmap, createMindmap, resetMindmap, updateItemMindmap } = mindmapSlice.actions
