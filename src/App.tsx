import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { TaskList } from './components/TaskList';
import { TaskForm } from './components/TaskForm';
import { TaskDetail } from './components/TaskDetail';
import { TaskPriority, TaskPriorityEnum, TaskStatus, TaskStatusEnum } from './types/electron';
import { NotificationProvider } from './components/NotificationProvider';
import './App.css';

function App() {
  const navigate = useNavigate();
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'all'>('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [showFilters, setShowFilters] = useState(false);

  const handleCreateNewTask = () => {
    navigate('/new-task');
  };

  return (
    <NotificationProvider>
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
                      Create A New Task
                    </button>
                    <button onClick={() => setShowFilters(!showFilters)} className="filters-toggle-btn">
                      {showFilters ? 'Hide' : 'Filters & Sort'}
                    </button>
                  </div>
                  {showFilters && (
                    <div className="filters-panel">
                      <div className="filter-container">
                        <label htmlFor="priority-filter">Priority:</label>
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
                        <label htmlFor="status-filter">Status:</label>
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
                        <label htmlFor="sort-order">Sort By:</label>
                        <select
                          id="sort-order"
                          value={sortOrder}
                          onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                        >
                          <option value="asc">Date Ascending</option>
                          <option value="desc">Date Descending</option>
                        </select>
                      </div>
                    </div>
                  )}
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
    </NotificationProvider>
  );
}

export default App;
