import Cookies from 'js-cookie'
import _ from 'lodash'

const getCookie = (key: string) => {
  return Cookies.get(key) || ''
}

const setCookie = (key: string, value: string, options: Cookies.CookieAttributes = {}) => {
  return Cookies.set(key, value, {
    domain: window.location.hostname,
    expires: 365,
    ...options,
  })
}

const deleteCookie = (key: string, options: Cookies.CookieAttributes = {}) => {
  return Cookies.remove(key, {
    domain: window.location.hostname,
    expires: 0,
    ...options,
  })
}

const clearAllCookies = () => {
  const allCookies = Cookies.get()
  for (const cookieName in allCookies) {
    Cookies.remove(cookieName, { domain: window.location.hostname })
  }
}

const clearAllStorage = (isSessionStorage = false) => {
  if (isSessionStorage) {
    sessionStorage.clear()
  } else {
    localStorage.clear()
  }
}

const clearAll = () => {
  clearAllCookies()
  clearAllStorage(false)
  clearAllStorage(true)
}

const getStorage = (key: string, isSessionStorage = false) => {
  const data = isSessionStorage ? sessionStorage.getItem(key) : localStorage.getItem(key)

  if (_.isNil(data) || _.isEmpty(data)) return ''
  return JSON.parse(data)
}

const setStorage = <T>(key: string, data: T, isSessionStorage = false) => {
  return isSessionStorage
    ? sessionStorage.setItem(key, JSON.stringify(data))
    : localStorage.setItem(key, JSON.stringify(data))
}

const deleteStorage = (key: string, isSessionStorage = false) => {
  if (isSessionStorage) sessionStorage.removeItem(key)
  else localStorage.removeItem(key)
}

// export module
const StorageUtils = {
  getCookie,
  setCookie,
  deleteCookie,
  getStorage,
  setStorage,
  deleteStorage,
  clearAll,
  clearAllCookies,
  clearAllStorage,
}
export default StorageUtils
