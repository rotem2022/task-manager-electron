import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  TaskStatus,
  TaskPriority,
  TaskUpdatePayload,
  TaskStatusEnum,
  TaskPriorityEnum,
} from '../types/electron';
import { useNotification } from './NotificationProvider';

export function TaskForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const isEditMode = Boolean(id);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TaskPriority>(TaskPriorityEnum.MEDIUM);
  const [status, setStatus] = useState<TaskStatus>(TaskStatusEnum.IN_PROGRESS);
  const [dueDate, setDueDate] = useState(new Date());
  const [dateError, setDateError] = useState('');

  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to midnight to compare dates only

    if (dueDate < today) {
      setDateError('Due date cannot be in the past.');
    } else {
      setDateError('');
    }
  }, [dueDate]);

  useEffect(() => {
    if (isEditMode && id) {
      const taskId = parseInt(id, 10);
      window.api.getTaskById(taskId).then(task => {
        if (task) {
          setTitle(task.title);
          setDescription(task.description || '');
          setPriority(task.priority);
          setStatus(task.status);
          setDueDate(new Date(task.dueDate));
        }
      });
    }
  }, [id, isEditMode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    try {
      if (isEditMode && id) {
        const taskId = parseInt(id, 10);
        const taskData: TaskUpdatePayload = { title, description, priority, status, dueDate };
        await window.api.updateTask(taskId, taskData);
      } else {
        await window.api.createTask({
          title,
          description,
          priority,
          status,
          dueDate,
        });
      }
      navigate('/');
    } catch (error) {
      console.error('Failed to save task:', error);
      let errorMessage = 'An unknown error occurred.';
      if (error instanceof Error) {
        const messageParts = error.message.split('Error:');
        errorMessage = messageParts[messageParts.length - 1].trim();
      }
      showNotification(errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Add a description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="date"
        placeholder="Add a due date"
        value={dueDate.toISOString().split('T')[0]}
        onChange={(e) => setDueDate(new Date(e.target.value))}
        required
      />
      {dateError && <p className="error-message">{dateError}</p>}
      
      {isEditMode && (
        <select value={status} onChange={(e) => setStatus(e.target.value as TaskStatus)}>
          {Object.values(TaskStatusEnum).map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      )}
      
      <select value={priority} onChange={(e) => setPriority(e.target.value as TaskPriority)}>
        {Object.values(TaskPriorityEnum).map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>

      <div className="form-buttons">
        <button type="button" onClick={() => navigate(-1)}>Cancel</button>
        <button type="submit" disabled={!!dateError}>{isEditMode ? 'Update' : 'Create'}</button>
      </div>
    </form>
  );
}
