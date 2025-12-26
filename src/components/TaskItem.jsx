import { useState } from 'react'

function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(task.title)

  const handleSave = () => {
    if (editValue.trim()) {
      onEdit(task.id, editValue.trim())
      setIsEditing(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave()
    } else if (e.key === 'Escape') {
      setEditValue(task.title)
      setIsEditing(false)
    }
  }

  const priorityEmoji = {
    low: '🟢',
    medium: '🟡',
    high: '🔴'
  }

  return (
    <li className={`task-item ${task.completed ? 'completed' : ''} priority-${task.priority}`}>
      <button 
        className={`checkbox ${task.completed ? 'checked' : ''}`}
        onClick={() => onToggle(task.id)}
        aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
      >
        {task.completed && '✓'}
      </button>

      {isEditing ? (
        <input
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          className="edit-input"
          autoFocus
        />
      ) : (
        <span 
          className="task-title"
          onDoubleClick={() => setIsEditing(true)}
        >
          <span className="priority-indicator">{priorityEmoji[task.priority]}</span>
          {task.title}
        </span>
      )}

      <div className="task-actions">
        {!isEditing && (
          <button 
            className="edit-btn"
            onClick={() => setIsEditing(true)}
            aria-label="Edit task"
          >
            ✏️
          </button>
        )}
        <button 
          className="delete-btn"
          onClick={() => onDelete(task.id)}
          aria-label="Delete task"
        >
          🗑️
        </button>
      </div>
    </li>
  )
}

export default TaskItem
