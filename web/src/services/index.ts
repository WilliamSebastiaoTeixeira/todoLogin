import axios from 'axios'
import { Notify } from 'quasar'
import { useAuthenticationStore } from '../stores/authentication'

const auth = useAuthenticationStore()

export const http = axios.create({
  baseURL: `http://127.0.0.1:8000/api/`
})

http.defaults.timeout = 300000

http.interceptors.request.use((config) => {
  if (auth.token && config.headers) {
    config.headers.Authorization = `Bearer ${auth.token}`
  }
  return config
})

http.interceptors.response.use(
  (response) => {
    return Promise.resolve(response)
  },
  async (error) => {
    if (!error.response) {
      Notify.create({
        message: 'Nosso serviço está temporariamente indisponível.',
        position: 'bottom',
        type: 'negative',
      })
      return Promise.reject(error)
    }

    if (error.request.responseType === 'blob') {
      const dataErrorParsed = JSON.parse(await error.response.data.text())
      error.response.data = dataErrorParsed
    }

    switch (error.response.status) {
      case 500:
        Notify.create({
          message: 'Um erro inesperado ocorreu. Tente novamente.',
          position: 'bottom',
          type: 'negative'
        })
        break
      case 400:
      case 404:
        Notify.create({
          message:
            error.response.data?.message ||
            'Um erro inesperado ocorreu. Tente novamente.',
          position: 'bottom',
          type: 'negative'
        })
        break
      case 502:
        Notify.create({
          message: 'Nosso serviço está temporariamente indisponível.',
          position: 'bottom',
          type: 'negative'
        })
        break
      case 401:
      case 403:
        Notify.create({
          message: error.response.data?.message || 'Você não tem permissão para realizar a ação solicitada',
          position: 'bottom',
          type: 'negative'
        })
        break
    }

    return Promise.reject(error)
  }
)
