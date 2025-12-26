function TaskFilters({ filter, onFilterChange, onClearCompleted, hasCompleted }) {
  return (
    <div className="filters">
      <div className="filter-buttons">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => onFilterChange('all')}
        >
          All
        </button>
        <button 
          className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
          onClick={() => onFilterChange('active')}
        >
          Active
        </button>
        <button 
          className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => onFilterChange('completed')}
        >
          Completed
        </button>
      </div>
      
      {hasCompleted && (
        <button 
          className="clear-btn"
          onClick={onClearCompleted}
        >
          Clear Completed
        </button>
      )}
    </div>
  )
}

export default TaskFilters
