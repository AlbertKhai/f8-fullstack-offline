import { isEmpty } from 'lodash'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Header from '~/components/Header/Header'
import Board from './Board/Board'

import { loadingOff, loadingOn, updateColumn } from '~/helper/actionsSlice'
import { getTrelloMiddleWare } from '~/redux/middlewares/getTrelloMiddleware'

const TrelloInner = () => {
  const isLogin = useSelector(({ auth }) => auth.isLogin)
  const getColumnPending = useSelector(({ column }) => column.pending)
  const dispatch = useDispatch()
  const [state, setState] = useState({ hasData: '' })

  useEffect(() => {
    const listColumn = JSON.parse(localStorage.getItem('columnState'))
    if (isLogin) {
      if (isEmpty(listColumn)) {
        dispatch(getTrelloMiddleWare())
      }
      dispatch(updateColumn(listColumn))
      setTimeout(function () {
        setState({ hasData: true })
      }, 0)
      return
    }
    setState({ hasData: '' })
    localStorage.removeItem('columnState')
  }, [isLogin])

  useEffect(() => {
    if (getColumnPending) {
      dispatch(loadingOn())
      return
    }
    dispatch(loadingOff())
  }, [getColumnPending])

  return (
    <div className='trello-inner'>
      <Header />
      {state.hasData && <Board />}
    </div>
  )
}

export default TrelloInner
