import AuthService from '../services/AuthService'


export function useServices() {
  return {
    authService: new AuthService(),
  }
}
