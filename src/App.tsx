import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { TaskList } from './components/TaskList';
import { TaskForm } from './components/TaskForm';
import { TaskDetail } from './components/TaskDetail';
import { TaskPriority, TaskStatus } from './types/electron';
import { NotificationProvider } from './components/NotificationProvider';
import { HeaderControls } from './components/HeaderControls';
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
                <HeaderControls
                  handleCreateNewTask={handleCreateNewTask}
                  showFilters={showFilters}
                  setShowFilters={setShowFilters}
                  priorityFilter={priorityFilter}
                  setPriorityFilter={setPriorityFilter}
                  statusFilter={statusFilter}
                  setStatusFilter={setStatusFilter}
                  sortOrder={sortOrder}
                  setSortOrder={setSortOrder}
                />
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
