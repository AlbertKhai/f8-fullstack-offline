import { createAsyncThunk } from '@reduxjs/toolkit'
import client from '~/helper/client'
import { formatDataForServer } from '~/helper/formatDataServer'

import { logout, toastAdd } from '~/helper/actionsSlice'

export const postTaskMiddleware = createAsyncThunk('postTaskMiddleware', async (listColumn, { dispatch }) => {
  const apiKey = localStorage.getItem('apiKey')
  if (!apiKey) {
    dispatch(toastAdd({ mess: 'Đã có lỗi xảy ra,\nbạn vui lòng đăng nhập lại nhé', type: 'danger' }))

    dispatch(logout())
    return
  }

  client.setApIKey(apiKey)

  const body = formatDataForServer(listColumn)

  await client.post('/tasks', body)
})
