import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Task, TaskPriority, TaskStatus } from '../types/electron';
import { useNotification } from './NotificationProvider';

interface TaskListProps {
  priorityFilter: TaskPriority | 'all';
  statusFilter: TaskStatus | 'all';
  sortOrder: 'asc' | 'desc';
}

export function TaskList({ priorityFilter, statusFilter, sortOrder }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    try {
      const allTasks = await window.api.getAllTasks({
        priority: priorityFilter,
        status: statusFilter,
        sortOrder: sortOrder,
      });
      setTasks(allTasks);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      let errorMessage = 'An unknown error occurred.';
      if (error instanceof Error) {
        const messageParts = error.message.split('Error:');
        errorMessage = messageParts[messageParts.length - 1].trim();
      }
      showNotification(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [priorityFilter, statusFilter, sortOrder, showNotification]);


  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  useEffect(() => {
    const cleanup = window.api.onTaskCreated((newTask: Task) => {
      setTasks(tasks => [...tasks, newTask]);
    });
    return cleanup;
  }, []);


  useEffect(() => {
    const cleanup = window.api.onTaskDeleted((id) => {
      setTasks(tasks => tasks.filter((task) => task.id !== id));
    });
    return cleanup;
  }, []);

  const handleTaskClick = useCallback((taskId: number) => {
    navigate(`/task/${taskId}`);
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="task-list-container">
        <h2>My Tasks</h2>
        <p>Loading tasks...</p>
      </div>
    );
  }

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
