import React, { useMemo } from 'react';
import { TaskPriority, TaskStatus, TaskPriorityEnum, TaskStatusEnum } from '../types/electron';

interface TaskFormFieldsProps {
  title: string;
  setTitle: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  dueDate: Date;
  setDueDate: (value: Date) => void;
  priority: TaskPriority;
  setPriority: (value: TaskPriority) => void;
  status: TaskStatus;
  setStatus: (value: TaskStatus) => void;
  isEditMode: boolean;
  dateError: string;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  handleCancel: () => void;
}

export function TaskFormFields({
  title, setTitle, description, setDescription,
  dueDate, setDueDate, priority, setPriority,
  status, setStatus, isEditMode, dateError,
  handleSubmit, handleCancel
}: TaskFormFieldsProps) {

  const priorityOptions = useMemo(() => Object.values(TaskPriorityEnum), []);
  const statusOptions = useMemo(() => Object.values(TaskStatusEnum), []);

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
          {statusOptions.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      )}
      
      <select value={priority} onChange={(e) => setPriority(e.target.value as TaskPriority)}>
        {priorityOptions.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>

      <div className="form-buttons">
        <button type="button" onClick={handleCancel}>Cancel</button>
        <button type="submit" disabled={!!dateError}>{isEditMode ? 'Update' : 'Create'}</button>
      </div>
    </form>
  );
} 