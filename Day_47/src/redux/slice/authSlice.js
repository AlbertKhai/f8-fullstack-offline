import { createSlice } from '@reduxjs/toolkit'
import { loginMiddleware } from '../middlewares/loginMiddleware'
import client from '~/helper/client'

const initialState = {
  isLogin: localStorage.getItem('apiKey') ?? false,
  status: 'idle'
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isLogin = false
    }
  },

  extraReducers: (builder) => {
    builder.addCase(loginMiddleware.pending, (state) => {
      state.isLogin = false
      state.status = 'pending'
    })
    builder.addCase(loginMiddleware.fulfilled, (state, action) => {
      client.setApIKey(action.payload.data.apiKey)
      localStorage.setItem('apiKey', action.payload.data.apiKey)
      state.isLogin = true
      state.status = 'success'
    })
    builder.addCase(loginMiddleware.rejected, (state) => {
      state.isLogin = false
      state.status = 'fail'
    })
  }
})
