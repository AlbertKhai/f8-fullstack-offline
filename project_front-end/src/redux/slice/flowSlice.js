import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  nodes: [],
  edges: []
}

export const flowSlice = createSlice({
  name: 'flow',
  initialState,
  reducers: {
    initiateFlow: (state, action) => {
      state.nodes = action.payload.nodes
      state.edges = action.payload.edges
    }
  }
})

export const { initiateFlow } = flowSlice.actions
