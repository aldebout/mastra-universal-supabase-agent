import { AuthProvider } from './components/AuthProvider'
import { AuthForm } from './components/AuthForm'
import { TodoApp } from './components/TodoApp'
import { ChatBot } from './components/ChatBot'
import { useAuth } from './contexts/AuthContext'
import './App.css'

function AppContent() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div>Loading...</div>
      </div>
    )
  }

  return user ? <TodoApp /> : <AuthForm />
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
      <ChatBot />
    </AuthProvider>
  )
}

export default App
