import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
} from '../services/taskService';

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

  // טען את ה-URL של Vite (בפיתוח) או את הקובץ שנבנה (ב-production)
  win.loadURL('http://localhost:5173');
  win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// IPC handlers
ipcMain.handle('tasks:create', async (_event, data) => {
  return createTask(data);
});

ipcMain.handle('tasks:getAll', async () => {
  return getAllTasks();
});

ipcMain.handle('tasks:update', async (_event, id, data) => {
  return updateTask(id, data);
});

ipcMain.handle('tasks:delete', async (_event, id) => {
  return deleteTask(id);
});
