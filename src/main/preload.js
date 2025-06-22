const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  createTask: (data) => ipcRenderer.invoke('tasks:create', data),
  getAllTasks: () => ipcRenderer.invoke('tasks:getAll'),
  updateTask: (id, data) => ipcRenderer.invoke('tasks:update', id, data),
  deleteTask: (id) => ipcRenderer.invoke('tasks:delete', id),
});
