import AuthService from '../services/AuthService'
import TodoService from '../services/TodoService'

export function useServices() {
  return {
    authService: new AuthService(),
    todoService: new TodoService()
  }
}
