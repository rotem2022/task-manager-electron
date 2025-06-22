import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from '../services/taskService';

const VITE_DEV_SERVER_URL = 'http://localhost:5173';

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  win.loadURL(VITE_DEV_SERVER_URL);
  win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// IPC handlers for data
ipcMain.handle('tasks:create', async (_event, data) => {
  const newTask = await createTask(data);
  const creatorWindow = BrowserWindow.fromWebContents(_event.sender);

  // Notify all windows that a task has been created
  for (const window of BrowserWindow.getAllWindows()) {
    if (window !== creatorWindow) { // Don't notify the window that created it
      window.webContents.send('task-created');
    }
  }

  return newTask;
});

ipcMain.handle('tasks:getAll', async (_event, priorityFilter) => {
  return getAllTasks(priorityFilter);
});

ipcMain.handle('tasks:update', async (_event, id, data) => {
  const updatedTask = await updateTask(id, data);
  // In a real app, you might want to send 'task-updated' event to all windows
  return updatedTask;
});

ipcMain.handle('tasks:delete', async (_event, id: number) => {
  const deletedTask = await deleteTask(id);
  // The UI now handles navigation, so no need to close window from here
  return deletedTask;
});

ipcMain.handle('tasks:get-by-id', async (_event, id: number) => {
  return getTaskById(id);
});
