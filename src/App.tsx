import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { TaskList } from './components/TaskList';
import { TaskForm } from './components/TaskForm';
import { TaskDetail } from './components/TaskDetail';
import { TaskPriority, TaskPriorityEnum, TaskStatus, TaskStatusEnum } from './types/electron';
import './App.css';

function App() {
  const navigate = useNavigate();
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'all'>('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleCreateNewTask = () => {
    navigate('/new-task');
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <header>
                <h1>Task Manager</h1>
                <div className="header-controls">
                  <button onClick={handleCreateNewTask} className="create-task-btn">
                    Create New Task
                  </button>
                  <div className="filter-container">
                    <label htmlFor="priority-filter">Filter by Priority:</label>
                    <select
                      id="priority-filter"
                      value={priorityFilter}
                      onChange={(e) => setPriorityFilter(e.target.value as TaskPriority | 'all')}
                    >
                      <option value="all">All</option>
                      {Object.values(TaskPriorityEnum).map(p => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>
                  <div className="filter-container">
                    <label htmlFor="status-filter">Filter by Status:</label>
                    <select
                      id="status-filter"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value as TaskStatus | 'all')}
                    >
                      <option value="all">All</option>
                      {Object.values(TaskStatusEnum).map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div className="filter-container">
                    <label htmlFor="sort-order">Sort by Due Date:</label>
                    <select
                      id="sort-order"
                      value={sortOrder}
                      onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                    >
                      <option value="asc">Ascending</option>
                      <option value="desc">Descending</option>
                    </select>
                  </div>
                </div>
              </header>
              <TaskList 
                priorityFilter={priorityFilter} 
                statusFilter={statusFilter} 
                sortOrder={sortOrder}
              />
            </>
          }
        />
        <Route
          path="/new-task"
          element={
            <>
              <header>
                <h1>Create A New Task</h1>
              </header>
              <TaskForm />
            </>
          }
        />
        <Route path="/task/:id" element={<TaskDetail />} />
        <Route path="/edit/:id" element={
          <>
            <header>
              <h1>Edit Task</h1>
            </header>
            <TaskForm />
          </>
        } />
      </Routes>
    </div>
  );
}

export default App;
