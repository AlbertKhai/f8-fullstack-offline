import Cookies from 'js-cookie'

export const setCookie = (key, value) => Cookies.set(key, JSON.stringify(value))

export const getCookie = (key) => {
  const value = Cookies.get(key)
  return value ? JSON.parse(value) : null
}
