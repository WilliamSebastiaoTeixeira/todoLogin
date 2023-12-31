import { http } from './index'

export interface Todo{
  user_id: string
  id: number
  title: string
  description: string
}

export interface GetResponse {
  status: string
  todos: Todo[]
}

export interface GetByIdResponse {
  status: string
  todo: Todo
}

export interface CreateResponse { 
  status: string
  message: string
  todo: Todo
}

export interface UpdateResponse { 
  status: string
  message: string
  todo: Todo
}

export interface DeleteResponse {
  status: string
  message: string
  todo: Todo
}

export default class TodoService {
  async getAll(): Promise<GetResponse> {
    const { data } = await http.get('/todos')
    return data
  }

  async getById(id: string): Promise<GetByIdResponse> {
    const { data } = await http.get(`/todo/${id}`)
    return data
  }

  async create(todo: Omit<Todo, 'id'  | 'user_id'>): Promise<CreateResponse> {
    const { data } = await http.post('/todo', todo)
    return data
  }

  async update(todo: Todo): Promise<UpdateResponse>{
    const { data } = await http.put(`/todo/${todo.id}`, todo)
    return data
  }

  async delete(id: string): Promise<DeleteResponse>{
    const { data } = await http.delete(`/todo/${id}`)
    return data
  } 
}