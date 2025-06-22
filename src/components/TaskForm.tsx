import React, { useState } from 'react';
import { TaskStatus } from '../types/electron';

export function TaskForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [status, setStatus] = useState<TaskStatus>(TaskStatus.IN_PROGRESS); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    try {
      await window.api.createTask({
        title,
        description,
        priority,
        status,
      });
      
    } catch (error) {
      console.error('Failed to create task:', error);
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
      
      <input
        type="text"
        placeholder="Add a status"
        value={status}
        onChange={(e) => setStatus(e.target.value as TaskStatus)}
      />
      
      <input
        type="text"
        placeholder="Add a priority"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      />

      <div className="form-buttons">
        <button type="button" onClick={() => window.api.closeCurrentWindow()}>Cancel</button>
        <button type="submit">Create</button>
      </div>
    </form>
  );
}
