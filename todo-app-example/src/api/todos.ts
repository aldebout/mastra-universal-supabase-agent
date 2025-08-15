import { supabase } from '../lib/supabase'
import type { Todo, CreateTodoData, UpdateTodoData } from '../types/todo'

export async function getTodos(): Promise<Todo[]> {
  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

export async function createTodo(todoData: Pick<CreateTodoData, 'title'>): Promise<Todo> {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) throw new Error('User not authenticated')

  const { data, error } = await supabase
    .from('todos')
    .insert({
      title: todoData.title,
      user_id: user.id,
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateTodo(id: string, updates: UpdateTodoData): Promise<Todo> {
  const { data, error } = await supabase
    .from('todos')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteTodo(id: string): Promise<void> {
  const { error } = await supabase
    .from('todos')
    .delete()
    .eq('id', id)

  if (error) throw error
}