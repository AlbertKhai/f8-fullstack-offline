import { toastAdd } from '~/helper/actionsSlice'

const emailRegex =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/

export const validateEmail = (value, dispatch) => {
  let mess
  switch (true) {
    case value.length > 255:
      mess = 'Chỉ chứa email tối đa 255 kí tự'
      break
    case value.length < 3:
      mess = 'Email phải chứa ít nhất 3 kí tự'
      break
    case !emailRegex.test(value):
      mess = 'Địa chỉ email không hợp lệ'
      break

    default:
      return false
  }

  dispatch(toastAdd({ mess: `${mess}\n Bạn vui lòng nhập lại nhé`, type: 'warning' }))
  return true
}
