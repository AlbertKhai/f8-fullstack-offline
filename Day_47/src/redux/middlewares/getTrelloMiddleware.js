import { createAsyncThunk } from '@reduxjs/toolkit'

import client from '~/helper/client'

export const getTrelloMiddleWare = createAsyncThunk('getTrelloMiddleWare', async () => {
  const { data } = await client.get('/tasks')
  return data.data
})
