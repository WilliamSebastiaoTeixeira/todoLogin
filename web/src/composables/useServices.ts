import LoginService from '../services/LoginService'


export function useServices() {
  return {
    loginService: new LoginService(),
  }
}
