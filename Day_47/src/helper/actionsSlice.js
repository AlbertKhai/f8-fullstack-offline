import { loadingSlice } from '../redux/slice/loadingSlice'
export const { loadingOn, loadingOff } = loadingSlice.actions

import { toastSlice } from '../redux/slice/toastSlice'
export const { toastAdd, toastRemove } = toastSlice.actions

import { columnSlice } from '~/redux/slice/columnSlice'
export const {
  addColumn,
  removeColumn,
  updateColumn,
  editTitle,
  addCard,
  removeCard,
  editCard,
  updateCard,
  postNewColumn,
  resetColumn
} = columnSlice.actions

import { authSlice } from '~/redux/slice/authSlice'
export const { logout } = authSlice.actions
