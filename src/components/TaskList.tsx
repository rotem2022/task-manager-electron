import React, { useState, useEffect, useCallback } from 'react';
import type { Task } from '../types/electron.d';


export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = useCallback(async () => {
    console.log('Fetching tasks...');
    const allTasks = await window.api.getAllTasks();
    setTasks(allTasks);
  }, []);

  // Fetch tasks on initial mount
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Listen for task creation events to refresh the list
  useEffect(() => {
    const cleanup = window.api.onTaskCreated(() => {
      console.log('Received task-created event, refreshing list...');
      fetchTasks();
    });

    // Cleanup the listener when the component unmounts
    return () => {
      cleanup();
    };
  }, [fetchTasks]);

  // Listen for task deletion events to refresh the list
  useEffect(() => {
    const cleanup = window.api.onTaskDeleted(() => {
      console.log('Received task-deleted event, refreshing list...');
      fetchTasks();
    });

    return () => {
      cleanup();
    };
  }, [fetchTasks]);

  const handleTaskClick = (taskId: number) => {
    window.api.openTaskDetailWindow(taskId);
  };

  return (
    <div className="task-list-container">
      <h2>My Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} onClick={() => handleTaskClick(task.id)} className="task-item">
            {task.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
