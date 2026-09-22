import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'

const client = axios.create({ baseURL })

client.interceptors.request.use((config) => {
  const user = localStorage.getItem('campusfinds_user')
  if (user) {
    try {
      const { token } = JSON.parse(user)
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    } catch {
      // ignore malformed stored session
    }
  }
  return config
})

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('campusfinds_user')
    }
    return Promise.reject(error)
  },
)

export default client