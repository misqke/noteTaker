const { contextBridge, ipcRenderer } = require('electron');
const notesManager = require("./database/notesManager");

contextBridge.exposeInMainWorld('notesManager', {
  addPage: (title) => notesManager.insertPage(title),
  deletePage: (pageId) => notesManager.deletePage(pageId),
  getPages: () => notesManager.getAllPAges(),
  getPageNotes: (pageId) => notesManager.getPageNotes(pageId),
})
