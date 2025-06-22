import { contextBridge, ipcRenderer } from 'electron';
import type { Task, TaskUpdatePayload, TaskStatus, TaskPriority, TaskFilters } from '../types/electron';

contextBridge.exposeInMainWorld('api', {
  createTask: (data: { title: string; description: string, priority: TaskPriority, status: TaskStatus  }) => 
    ipcRenderer.invoke('tasks:create', data),
  
  getAllTasks: (filters: TaskFilters): Promise<Task[]> => 
    ipcRenderer.invoke('tasks:getAll', filters),
  
  updateTask: (id: number, data: TaskUpdatePayload): Promise<Task> => 
    ipcRenderer.invoke('tasks:update', id, data),
  
  deleteTask: (id: number): Promise<Task> => 
    ipcRenderer.invoke('tasks:delete', id),

  onTaskCreated: (callback: () => void) => {
    const listener = () => callback();
    ipcRenderer.on('task-created', listener);
    return () => {
      ipcRenderer.removeListener('task-created', listener);
    };
  },

  getTaskById: (id: number) => ipcRenderer.invoke('tasks:get-by-id', id),

  onTaskDeleted: (callback: (taskId: number) => void) => {
    const listener = (_event: Electron.IpcRendererEvent, taskId: number) => callback(taskId);
    ipcRenderer.on('task-deleted', listener);

    return () => {
      ipcRenderer.removeListener('task-deleted', listener);
    };
  },
});