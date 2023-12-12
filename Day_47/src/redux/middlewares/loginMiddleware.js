import { createAsyncThunk } from '@reduxjs/toolkit'

import client from '~/helper/client'
import { loadingOn, loadingOff } from '~/helper/actionsSlice'

export const loginMiddleware = createAsyncThunk('loginMiddleware', async (email, { dispatch }) => {
  dispatch(loadingOn())
  const { data } = await client.get(`/api-key?email=${email}`)

  dispatch(loadingOff())
  return data
})
