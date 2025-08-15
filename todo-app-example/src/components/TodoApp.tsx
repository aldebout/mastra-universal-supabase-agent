import { useAuth } from '../contexts/AuthContext'
import { useTodos } from '../hooks/useTodos'
import { TodoForm } from './TodoForm'
import { TodoItem } from './TodoItem'

export function TodoApp() {
  const { user, signOut } = useAuth()
  const { data: todos, isLoading, error } = useTodos()

  if (isLoading) {
    return (
      <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '2rem', textAlign: 'center' }}>
        <div>Loading todos...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '2rem', textAlign: 'center' }}>
        <div style={{ color: '#dc3545' }}>Error loading todos: {(error as Error).message}</div>
      </div>
    )
  }

  const completedCount = todos?.filter(todo => todo.completed).length || 0
  const totalCount = todos?.length || 0

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Todo App</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span>Welcome, {user?.email}</span>
          <button 
            onClick={signOut}
            style={{ 
              padding: '0.5rem 1rem', 
              backgroundColor: '#dc3545', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Sign Out
          </button>
        </div>
      </div>

      <TodoForm />

      <div style={{ marginBottom: '1rem' }}>
        <h3>Your Todos ({completedCount}/{totalCount} completed)</h3>
      </div>

      {todos && todos.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
      ) : (
        <div style={{ 
          textAlign: 'center', 
          padding: '3rem', 
          backgroundColor: '#f8f9fa', 
          borderRadius: '8px',
          color: '#666'
        }}>
          No todos yet. Add one above to get started!
        </div>
      )}
    </div>
  )
}