import { useState } from 'react'
import type { Todo } from '../types/todo'
import { useUpdateTodo, useDeleteTodo } from '../hooks/useTodos'

interface TodoItemProps {
  todo: Todo
}

export function TodoItem({ todo }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(todo.title)
  
  const updateTodo = useUpdateTodo()
  const deleteTodo = useDeleteTodo()

  const handleToggleComplete = () => {
    updateTodo.mutate({
      id: todo.id,
      updates: { completed: !todo.completed }
    })
  }

  const handleEdit = () => {
    if (isEditing) {
      if (editTitle.trim() && editTitle !== todo.title) {
        updateTodo.mutate({
          id: todo.id,
          updates: { title: editTitle.trim() }
        })
      }
      setIsEditing(false)
    } else {
      setIsEditing(true)
    }
  }

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this todo?')) {
      deleteTodo.mutate(todo.id)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEdit()
    } else if (e.key === 'Escape') {
      setEditTitle(todo.title)
      setIsEditing(false)
    }
  }

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '1rem', 
      padding: '1rem', 
      backgroundColor: '#ffffff', 
      borderRadius: '8px',
      border: '1px solid #dee2e6'
    }}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggleComplete}
        disabled={updateTodo.isPending}
        style={{ transform: 'scale(1.2)' }}
      />
      
      {isEditing ? (
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          onKeyDown={handleKeyPress}
          onBlur={handleEdit}
          autoFocus
          style={{ 
            flex: 1, 
            padding: '0.5rem', 
            fontSize: '1rem',
            border: '1px solid #007bff',
            borderRadius: '4px'
          }}
        />
      ) : (
        <span
          onClick={() => setIsEditing(true)}
          style={{
            flex: 1,
            textDecoration: todo.completed ? 'line-through' : 'none',
            opacity: todo.completed ? 0.6 : 1,
            cursor: 'text',
            padding: '0.5rem',
            color: '#333333'
          }}
        >
          {todo.title}
        </span>
      )}

      <button
        onClick={handleEdit}
        disabled={updateTodo.isPending}
        style={{
          padding: '0.25rem 0.5rem',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        {isEditing ? 'Save' : 'Edit'}
      </button>

      <button
        onClick={handleDelete}
        disabled={deleteTodo.isPending}
        style={{
          padding: '0.25rem 0.5rem',
          backgroundColor: '#dc3545',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Delete
      </button>
    </div>
  )
}