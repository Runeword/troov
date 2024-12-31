export const useAuth = () => {
  // Return true if a token exists in local storage, false otherwise
  const isAuthenticated = () => {
    if (process.client) {
      return !!localStorage.getItem('token')
    }
    return false
  }

  // Functions to manage the local storage token state
  const getToken = () => {
    if (process.client) {
      return localStorage.getItem('token')
    }
    return null
  }
  const setToken = (token: string) => {
    if (process.client) {
      localStorage.setItem('token', token)
    }
  }
  const removeToken = () => {
    if (process.client) {
      localStorage.removeItem('token')
    }
  }

  return {
    isAuthenticated,
    getToken,
    setToken,
    removeToken,
  }
}
