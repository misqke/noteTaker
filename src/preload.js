const { contextBridge } = require('electron');
const notesManager = require("./database/notesManager");

contextBridge.exposeInMainWorld('notesManager', {
  addPage: (title) => notesManager.insertPage(title),
  getPages: () => notesManager.getAllPAges(),
})