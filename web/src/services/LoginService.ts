import { http } from './index'

export interface LoginRequest {
  email: string
  senha: string
}

export interface RegisterRequest {
  email: string
  senha: string
  confirmarSenha: string
}

export interface Usuario {
  _id?: string
  email: string
}

export interface LoginResponse {
  token: string,
  usuario: Usuario
}

export default class LoginService {
  async login(params: LoginRequest): Promise<LoginResponse> {
    const { data } = await http.post('/login', params)
    return data
  }

  async register(params: RegisterRequest): Promise<void>{
    await http.post('/registrar', params)
  }
}