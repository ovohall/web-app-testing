import { useState, useEffect } from 'react'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import TaskFilters from './components/TaskFilters'

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks')
    return saved ? JSON.parse(saved) : []
  })
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = (title, priority = 'medium') => {
    const newTask = {
      id: Date.now(),
      title,
      priority,
      completed: false,
      createdAt: new Date().toISOString()
    }
    setTasks([newTask, ...tasks])
  }

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const editTask = (id, newTitle) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, title: newTitle } : task
    ))
  }

  const clearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed))
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed
    if (filter === 'completed') return task.completed
    return true
  })

  const completedCount = tasks.filter(t => t.completed).length
  const activeCount = tasks.length - completedCount

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>📋 Task Manager</h1>
          <p className="subtitle">Stay organized, get things done</p>
        </header>

        <TaskForm onAdd={addTask} />
        
        <div className="stats">
          <span className="stat">
            <strong>{activeCount}</strong> active
          </span>
          <span className="stat">
            <strong>{completedCount}</strong> completed
          </span>
        </div>

        <TaskFilters 
          filter={filter} 
          onFilterChange={setFilter}
          onClearCompleted={clearCompleted}
          hasCompleted={completedCount > 0}
        />

        <TaskList 
          tasks={filteredTasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
          onEdit={editTask}
        />

        {tasks.length === 0 && (
          <div className="empty-state">
            <span className="empty-icon">✨</span>
            <p>No tasks yet. Add one above!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
