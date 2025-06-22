import { ipcMain, BrowserWindow } from 'electron';
import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from '../services/taskService';

// Centralized error handler
function handleError(error: unknown, message: string): never {
  console.error(message, error);
  throw new Error(message);
}

export function registerIpcHandlers() {
  ipcMain.handle('tasks:create', async (_event, data) => {
    try {
      const newTask = await createTask(data);
      const creatorWindow = BrowserWindow.fromWebContents(_event.sender);

      // Notify all windows that a task has been created
      for (const window of BrowserWindow.getAllWindows()) {
        if (window !== creatorWindow) {
          window.webContents.send('task-created');
        }
      }

      return newTask;
    } catch (error) {
      handleError(error, 'Failed to create the task. Please check the database connection and try again.');
    }
  });

  ipcMain.handle('tasks:getAll', async (_event, filters) => {
    try {
      return await getAllTasks(filters);
    } catch (error) {
      handleError(error, 'Failed to fetch tasks. Please check the database connection and try again.');
    }
  });

  ipcMain.handle('tasks:update', async (_event, id, data) => {
    try {
      return await updateTask(id, data);
    } catch (error) {
      handleError(error, 'Failed to update the task. Please check the database connection and try again.');
    }
  });

  ipcMain.handle('tasks:delete', async (_event, id: number) => {
    try {
      return await deleteTask(id);
    } catch (error) {
      handleError(error, 'Failed to delete the task. Please check the database connection and try again.');
    }
  });

  ipcMain.handle('tasks:get-by-id', async (_event, id: number) => {
    try {
      return await getTaskById(id);
    } catch (error) {
      handleError(error, 'Failed to fetch the task details. Please check the database connection and try again.');
    }
  });
} 