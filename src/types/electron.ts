import type { TaskPriority as BackendTaskPriority, TaskStatus as BackendTaskStatus } from '../services/taskService';

// Re-export the types for use in the frontend components
export type TaskPriority = BackendTaskPriority;
export type TaskStatus = BackendTaskStatus;

export const TaskPriorityEnum = {
  HIGH: 'HIGH',
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
} as const;

export const TaskStatusEnum = {
  IN_PROGRESS: 'IN_PROGRESS',
  DONE: 'DONE',
  CANCELLED: 'CANCELLED',
} as const;

export type Task = {
  id: number;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export type TaskUpdatePayload = Partial<Omit<Task, 'id' | 'createdAt' | 'updatedAt'>>;


export interface IpcApi {
  getAllTasks: (priorityFilter: TaskPriority | 'all') => Promise<Task[]>;
  createTask: (data: { title: string; description: string, priority: TaskPriority, status: TaskStatus }) => Promise<Task>;
  updateTask: (id: number, data: TaskUpdatePayload) => Promise<Task>;
  deleteTask: (id: number) => Promise<Task>;
  onTaskCreated: (callback: () => void) => (() => void);
  getTaskById: (id: number) => Promise<Task | null>;
  onTaskDeleted: (callback: (taskId: number) => void) => () => void;
}

declare global {
  interface Window {
    api: IpcApi;
  }
}
