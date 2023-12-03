import { loadingSlice } from '../redux/slice/loadingSlice'
export const { loadingOn, loadingOff } = loadingSlice.actions

import { toastSlice } from '../redux/slice/toastSlice'
export const { toastAdd, toastRemove } = toastSlice.actions

import { columnSlice } from '~/redux/slice/columnSlice'
export const { addColumn, removeColumn, editTitle, addCard, removeCard, editCard } = columnSlice.actions
