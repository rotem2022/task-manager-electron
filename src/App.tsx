import { Routes, Route } from 'react-router-dom';
import { TaskList } from './components/TaskList';
import { TaskForm } from './components/TaskForm';
import { TaskDetail } from './components/TaskDetail';
import './App.css';

function App() {

  const handleCreateNewTask = () => {
    // This will eventually open a new window
    // For now, it will navigate to the new-task route
    window.api.openNewTaskWindow();
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
                <button onClick={handleCreateNewTask} className="create-task-btn">
                  Create New Task
                </button>
              </header>
              <TaskList />
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
      </Routes>
    </div>
  );
}

export default App;
