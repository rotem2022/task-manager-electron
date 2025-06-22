import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  TaskStatus,
  TaskPriority,
  TaskUpdatePayload,
  TaskStatusEnum,
  TaskPriorityEnum,
} from '../types/electron';

export function TaskForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TaskPriority>(TaskPriorityEnum.MEDIUM);
  const [status, setStatus] = useState<TaskStatus>(TaskStatusEnum.IN_PROGRESS);

  useEffect(() => {
    if (isEditMode && id) {
      const taskId = parseInt(id, 10);
      window.api.getTaskById(taskId).then(task => {
        if (task) {
          setTitle(task.title);
          setDescription(task.description || '');
          setPriority(task.priority);
          setStatus(task.status);
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
        const taskData: TaskUpdatePayload = { title, description, priority, status };
        await window.api.updateTask(taskId, taskData);
      } else {
        await window.api.createTask({
          title,
          description,
          priority,
          status: TaskStatusEnum.IN_PROGRESS,
        });
      }
      navigate('/');
    } catch (error) {
      console.error('Failed to save task:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Add a description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      
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
        <button type="submit">{isEditMode ? 'Update' : 'Create'}</button>
      </div>
    </form>
  );
}
