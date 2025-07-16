import { ipcMain, BrowserWindow } from 'electron';
import { Prisma } from '@prisma/client';
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
          window.webContents.send('task-created', newTask);
        }
      }

      return newTask;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // P2002 is the error code for a unique constraint violation
        if (error.code === 'P2002') {
          handleError(error, `A task with the title "${data.title}" already exists. Please use a different title.`);
        }
      }
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
      const deletedTask = await deleteTask(id);
      // Notify all windows that a task has been deleted
      for (const window of BrowserWindow.getAllWindows()) {
        window.webContents.send('task-deleted', id);
      }
      return deletedTask;
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