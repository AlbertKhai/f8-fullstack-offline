import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  confirm: false,
  shareMindmap: false
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setOpenModal: (state, { payload: { modalName, value } }) => {
      state[modalName] = value
    }
  }
})

export const { setOpenModal } = modalSlice.actions
