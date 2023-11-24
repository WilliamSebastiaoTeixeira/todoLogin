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
  id: number
  email: string
  name: string
  created_at: Date
  updated_at: Date
  email_verified_at: Date | null
}
export interface Authorisation {
  token: string
  type: string
}
export interface LoginResponse {
  authorisation: Authorisation
  user: Usuario
  status: string
}

export interface RegisterResponse {
  authorisation: Authorisation
  user: Usuario
  message: string
  status: string
}

export default class AuthService {
  async login(params: LoginRequest): Promise<LoginResponse> {
    const { data } = await http.post('/login', params)
    return data
  }

  async register(params: RegisterRequest): Promise<RegisterResponse>{
    const { data } = await http.post('/register', params)
    return data
  }
}