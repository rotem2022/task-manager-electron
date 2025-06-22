import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import type { Task } from '../types/electron.d';
import '../App.css'; 

export function TaskDetail() {
  const { id } = useParams<{ id: string }>();
  const [task, setTask] = useState<Task | null | undefined>(undefined);

  useEffect(() => {
    if (id) {
      const taskId = parseInt(id, 10);
      window.api.getTaskById(taskId).then(fetchedTask => {
        setTask(fetchedTask);
      });
    }
  }, [id]);

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
      <p><strong>Created:</strong> {new Date(task.createdAt).toLocaleString()}</p>
      <p><strong>Last Updated:</strong> {new Date(task.updatedAt).toLocaleString()}</p>
      <div className="form-buttons">
        <button type="button" className="delete-button" onClick={handleDelete}>Delete Task</button>
        <button type="button" onClick={() => window.api.closeCurrentWindow()}>Close</button>
      </div>
    </div>
  );

  async function handleDelete() {
    if (task) {
      // Optional: Add a confirmation dialog here
      await window.api.deleteTask(task.id);
      // The main process will close the window
    }
  }
} 