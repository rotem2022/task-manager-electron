import  { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Task } from '../types/electron';
import { useNotification } from './NotificationProvider';
import '../App.css'; 

export function TaskDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const [task, setTask] = useState<Task | null | undefined>(undefined);

  useEffect(() => {
    if (id) {
      const taskId = parseInt(id, 10);
      window.api.getTaskById(taskId)
        .then(fetchedTask => {
          setTask(fetchedTask);
        })
        .catch(error => {
          console.error('Failed to fetch task details:', error);
          let errorMessage = 'An unknown error occurred.';
          if (error instanceof Error) {
            const messageParts = error.message.split('Error:');
            errorMessage = messageParts[messageParts.length - 1].trim();
          }
          showNotification(errorMessage);
          setTask(null); 
        });
    }
  }, [id, showNotification]);

  if (task === undefined) {
    return <div>Loading task details...</div>;
  }

  if (task === null) {
    return <div>Task not found.</div>;
  }

  return (
    <div className="task-detail-container">
      <h1>{task.title}</h1>
      <p><strong>Status:</strong> {task.status}</p>
      <p><strong>Priority:</strong> {task.priority}</p>
      <p><strong>Description:</strong> {task.description || 'No description'}</p>
      <hr />
      <p><strong>Due Date:</strong> {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'Not set'}</p>
      <p><strong>Created:</strong> {new Date(task.createdAt).toLocaleDateString()}</p>
      <p><strong>Last Updated:</strong> {new Date(task.updatedAt).toLocaleDateString()}</p>
      <div className="form-buttons">
        <button type="button" onClick={handleEdit}>Edit Task</button>
        <button type="button" className="delete-button" onClick={handleDelete}>Delete Task</button>
        <button type="button" onClick={() => navigate('/')}>Close</button>
      </div>
    </div>
    
  );

  function handleEdit() {
    if (task) {
      navigate(`/edit/${task.id}`);
    }
  }

  async function handleDelete() {
    if (task) {
      try {
        await window.api.deleteTask(task.id);
        navigate('/'); // Navigate back to list after delete
      } catch (error) {
        console.error('Failed to delete task:', error);
        let errorMessage = 'An unknown error occurred.';
        if (error instanceof Error) {
          const messageParts = error.message.split('Error:');
          errorMessage = messageParts[messageParts.length - 1].trim();
        }
        showNotification(errorMessage);
      }
    }
  }
} 