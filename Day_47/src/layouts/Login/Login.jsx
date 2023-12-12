import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadingOff, loadingOn, toastAdd } from '~/helper/actionsSlice'
import { loginMiddleware } from '~/redux/middlewares/loginMiddleware'
import { validateEmail } from '~/utils/validate'

const Login = () => {
  const [state, setState] = useState({ inputLogin: '' })
  const dispatch = useDispatch()
  const loginStatus = useSelector(({ auth }) => auth.status)

  const handleLogin = (e) => {
    e.preventDefault()
    if (validateEmail(state.inputLogin, dispatch)) return
    dispatch(loginMiddleware(state.inputLogin))
  }

  const handleInput = (e) => {
    setState({ ...state, inputLogin: e.target.value })
  }

  useEffect(() => {
    if (loginStatus === 'pending') {
      dispatch(loadingOn())
      return
    }

    if (loginStatus === 'fail') {
      dispatch(toastAdd({ mess: 'Email không tồn tại trong dữ liệu,\n Bạn vui lòng đăng nhập nhé', type: 'danger' }))
    }

    dispatch(loadingOff())
  }, [loginStatus])

  return (
    <form onSubmit={handleLogin} action='' method='post' className='form__login'>
      <input
        onInput={handleInput}
        value={state.inputLogin}
        className='input__login'
        type='text'
        placeholder='📧 Nhập email F8 của bạn ở đây nhé'
        autoFocus
      />
      <button className='btn__login'>
        <span className='text'>Đăng nhập</span>
      </button>
    </form>
  )
}

export default Login
