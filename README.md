# Task Manager App

A modern, beautiful task management application built with React and Vite.

![Task Manager](https://img.shields.io/badge/React-18.3-blue) ![Vite](https://img.shields.io/badge/Vite-6.0-purple)

## Features

- ✅ **Add Tasks** - Create new tasks with priority levels (Low, Medium, High)
- ✏️ **Edit Tasks** - Double-click or use edit button to modify tasks
- ✓ **Complete Tasks** - Mark tasks as done with a single click
- 🗑️ **Delete Tasks** - Remove tasks you no longer need
- 🔍 **Filter Tasks** - View All, Active, or Completed tasks
- 🧹 **Clear Completed** - Remove all completed tasks at once
- 💾 **Persistent Storage** - Tasks are saved to localStorage
- 📱 **Responsive Design** - Works great on desktop and mobile
- 🌙 **Dark Theme** - Easy on the eyes with a beautiful dark UI

## Getting Started

### Prerequisites

- Node.js 18+ installed

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

## Usage

1. **Add a task**: Type in the input field and click "Add Task" or press Enter
2. **Set priority**: Choose Low, Medium, or High priority from the dropdown
3. **Complete a task**: Click the circle checkbox on the left
4. **Edit a task**: Double-click the task text or click the ✏️ button
5. **Delete a task**: Click the 🗑️ button
6. **Filter tasks**: Use the All/Active/Completed buttons
7. **Clear completed**: Click "Clear Completed" to remove all done tasks

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **CSS3** - Custom styling with CSS variables
- **localStorage** - Data persistence

## Project Structure

```
src/
├── components/
│   ├── TaskForm.jsx    # Form for adding new tasks
│   ├── TaskList.jsx    # Container for task items
│   ├── TaskItem.jsx    # Individual task component
│   └── TaskFilters.jsx # Filter buttons component
├── App.jsx             # Main application component
├── main.jsx            # Entry point
└── index.css           # Global styles
```

## License

MIT
