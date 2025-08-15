import { useState } from 'react'
import { useCreateTodo } from '../hooks/useTodos'

export function TodoForm() {
  const [title, setTitle] = useState('')
  const createTodo = useCreateTodo()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim()) {
      createTodo.mutate(
        { title: title.trim() },
        {
          onSuccess: () => {
            setTitle('')
          }
        }
      )
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <input
          type="text"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={createTodo.isPending}
          style={{
            flex: 1,
            padding: '0.75rem',
            fontSize: '1rem',
            border: '1px solid #dee2e6',
            borderRadius: '4px'
          }}
        />
        <button
          type="submit"
          disabled={createTodo.isPending || !title.trim()}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          {createTodo.isPending ? 'Adding...' : 'Add Todo'}
        </button>
      </div>
    </form>
  )
}