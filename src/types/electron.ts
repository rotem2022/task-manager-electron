export type Task = {
  id: number;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: string;
  dueDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export enum TaskStatus { 
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
  CANCELLED = 'CANCELLED'
}

export type TaskUpdatePayload = Partial<Omit<Task, 'id' | 'createdAt' | 'updatedAt'>>;


export interface IpcApi {
  getAllTasks: () => Promise<Task[]>;
  createTask: (data: { title: string; description: string, priority: string, status: TaskStatus }) => Promise<Task>;
  updateTask: (id: number, data: TaskUpdatePayload) => Promise<Task>;
  deleteTask: (id: number) => Promise<Task>;
  openNewTaskWindow: () => void;
  onTaskCreated: (callback: () => void) => (() => void);
  closeCurrentWindow: () => void;
  openTaskDetailWindow: (taskId: number) => void;
  getTaskById: (id: number) => Promise<Task | null>;
  onTaskDeleted: (callback: (taskId: number) => void) => () => void;
}

declare global {
  interface Window {
    api: IpcApi;
  }
}
