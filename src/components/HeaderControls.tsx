import React, { useMemo } from 'react';
import { TaskPriority, TaskPriorityEnum, TaskStatus, TaskStatusEnum } from '../types/electron';

interface HeaderControlsProps {
  handleCreateNewTask: () => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  priorityFilter: TaskPriority | 'all';
  setPriorityFilter: (value: TaskPriority | 'all') => void;
  statusFilter: TaskStatus | 'all';
  setStatusFilter: (value: TaskStatus | 'all') => void;
  sortOrder: 'asc' | 'desc';
  setSortOrder: (value: 'asc' | 'desc') => void;
}

export function HeaderControls({
  handleCreateNewTask,
  showFilters,
  setShowFilters,
  priorityFilter,
  setPriorityFilter,
  statusFilter,
  setStatusFilter,
  sortOrder,
  setSortOrder,
}: HeaderControlsProps) {
  
  const priorityOptions = useMemo(() => Object.values(TaskPriorityEnum), []);
  const statusOptions = useMemo(() => Object.values(TaskStatusEnum), []);

  return (
    <header>
      <h1>Task Manager</h1>
      <div className="header-controls">
        <button onClick={handleCreateNewTask} className="create-task-btn">
          Create A New Task
        </button>
        <button onClick={() => setShowFilters(!showFilters)} className="filters-toggle-btn">
          {showFilters ? 'Hide' : 'Filters & Sort'}
        </button>
      </div>
      {showFilters && (
        <div className="filters-panel">
          <div className="filter-container">
            <label htmlFor="priority-filter">Priority:</label>
            <select
              id="priority-filter"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value as TaskPriority | 'all')}
            >
              <option value="all">All</option>
              {priorityOptions.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
          <div className="filter-container">
            <label htmlFor="status-filter">Status:</label>
            <select
              id="status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as TaskStatus | 'all')}
            >
              <option value="all">All</option>
              {statusOptions.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="filter-container">
            <label htmlFor="sort-order">Sort By:</label>
            <select
              id="sort-order"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
            >
              <option value="asc">Due Date Ascending</option>
              <option value="desc">Due Date Descending</option>
            </select>
          </div>
        </div>
      )}
    </header>
  );
} 