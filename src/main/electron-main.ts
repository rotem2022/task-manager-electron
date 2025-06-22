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

// IPC handlers
ipcMain.handle('tasks:open-window', (event) => {
  const parentWindow = BrowserWindow.fromWebContents(event.sender);
  
  const childWindow = new BrowserWindow({
    width: 500,
    height: 600,
    parent: parentWindow ?? undefined,
    modal: true,
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  childWindow.loadURL(`${VITE_DEV_SERVER_URL}/#/new-task`);
  
  childWindow.once('ready-to-show', () => {
    childWindow.show();
  });
});

ipcMain.handle('tasks:create', async (_event, data) => {
  const newTask = await createTask(data);

  // Notify all windows that a task has been created
  for (const window of BrowserWindow.getAllWindows()) {
    window.webContents.send('task-created');
  }

  // Close the window that initiated the creation
  const creatorWindow = BrowserWindow.fromWebContents(_event.sender);
  creatorWindow?.close();

  return newTask;
});

ipcMain.handle('tasks:getAll', async () => {
  return getAllTasks();
});

ipcMain.handle('tasks:update', async (_event, id, data) => {
  return updateTask(id, data);
});

ipcMain.handle('tasks:delete', async (_event, id: number) => {
  const deletedTask = await deleteTask(id);

  // Notify all windows that a task has been deleted
  for (const window of BrowserWindow.getAllWindows()) {
    // We send the ID of the deleted task with the event
    window.webContents.send('task-deleted', id);
  }

  // Close the window that initiated the deletion
  const currentWindow = BrowserWindow.fromWebContents(_event.sender);
  currentWindow?.close();

  return deletedTask;
});

ipcMain.handle('tasks:get-by-id', async (_event, id: number) => {
  return getTaskById(id);
});

ipcMain.handle('tasks:open-detail-window', (event, taskId: number) => {
  const parentWindow = BrowserWindow.fromWebContents(event.sender);

  const detailWindow = new BrowserWindow({
    width: 600,
    height: 400,
    parent: parentWindow ?? undefined,
    modal: true,
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  detailWindow.loadURL(`${VITE_DEV_SERVER_URL}/#/task/${taskId}`);
  
  detailWindow.once('ready-to-show', () => {
    detailWindow.show();
  });
});

ipcMain.handle('window:close', (event) => {
  const windowToClose = BrowserWindow.fromWebContents(event.sender);
  windowToClose?.close();
});
