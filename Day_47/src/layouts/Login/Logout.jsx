import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout, toastAdd, resetColumn } from '~/helper/actionsSlice'

const Logout = () => {
  const dispatch = useDispatch()
  const updateError = useSelector(({ column }) => column.updateError)

  const handleLogout = () => {
    dispatch(logout())
    localStorage.removeItem('apiKey')
    localStorage.removeItem('columnState')
  }

  useEffect(() => {
    if (updateError) {
      dispatch(toastAdd({ mess: 'Lỗi hệ thống bạn vui lòng đăng nhập lại nhé', type: 'danger' }))
      handleLogout()
    }
  }, [updateError])

  useEffect(() => {
    return () => {
      dispatch(resetColumn())
    }
  }, [])

  return (
    <button onClick={handleLogout} className='btn__logout'>
      <span className='text'>Đăng xuất</span>
    </button>
  )
}

export default Logout
