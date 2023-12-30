import { getCookie } from '@/utils/handleCookie'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  listMindmap: getCookie('listMindmap') || [],
  statusMindmap: 'idle'
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
      state.listMindmap.forEach((mindmap, index) => {
        if (mindmap.id === idMindmap) {
          state.listMindmap[index] = { ...mindmap, ...data }
        }
      })

      state.statusMindmap = status || state.statusMindmap
    }
  }
})

export const { initiateMindmap, createMindmap, resetMindmap, updateItemMindmap } = mindmapSlice.actions
