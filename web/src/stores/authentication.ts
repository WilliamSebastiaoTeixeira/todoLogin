import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Ref } from 'vue'

import { Usuario } from '../services/LoginService'

const tokenFromStorage: string | undefined = localStorage.getItem('token') ?? undefined

const usuarioFromStorage: Usuario | undefined = localStorage.getItem('usuario')
  ? JSON.parse(localStorage.getItem('usuario') as string)
  : undefined

export const useAuthenticationStore = defineStore('authentication', () => {
  const token  = ref(tokenFromStorage) as Ref<string | undefined>
  const usuario = ref(usuarioFromStorage) as Ref< Usuario|undefined>

  function setToken(incomingToken: string | undefined): void {
    if (incomingToken) localStorage.setItem('token', incomingToken)
    token.value = incomingToken
  }

  function setUsuario(UsuarioInfo: Usuario | undefined): void {
    if (UsuarioInfo) localStorage.setItem('usuario', JSON.stringify(UsuarioInfo))
    usuario.value = UsuarioInfo
  }

  function logout(): void {
    localStorage.removeItem('usuario')
    localStorage.removeItem('token')
    setUsuario(undefined)
    setToken(undefined)
  }

  return {
    token,
    usuario,
    logout,
    setToken,
    setUsuario,
  }
})
