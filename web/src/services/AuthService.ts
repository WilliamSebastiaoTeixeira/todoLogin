import { http } from './index'

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  name: string
  password: string
}

export interface Usuario {
  email: string,
  name: string
}

export interface LoginResponse {
  token: string,
  usuario: Usuario
}

export default class AuthService {
  async login(params: LoginRequest): Promise<LoginResponse> {
    const { data } = await http.post('/login', params)
    return data
  }

  async register(params: RegisterRequest): Promise<any>{
    const { data } = await http.post('/register', params)
    return data
  }
}