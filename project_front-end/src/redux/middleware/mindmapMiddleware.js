const { createAsyncThunk } = require('@reduxjs/toolkit')

export const fetchMindmap = createAsyncThunk('fetchMindmap', async () => {
  const response = await fetch(process.env.URL_API_MINDMAP + '/')
  const data = response.json()
  return data
})
