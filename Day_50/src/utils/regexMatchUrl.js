export const validLogin = (pathname) => {
  const regexUrl = /((vi|en)\/login)$/
  return regexUrl.test(pathname)
}

export const validProfile = (pathname) => {
  const regexUrl = /((vi|en)\/profile)$/
  return regexUrl.test(pathname)
}
