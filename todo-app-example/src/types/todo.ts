import { Database } from './database'

export type Todo = Database['public']['Tables']['todos']['Row']
export type CreateTodoData = Database['public']['Tables']['todos']['Insert']
export type UpdateTodoData = Database['public']['Tables']['todos']['Update']