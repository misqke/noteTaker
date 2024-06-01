const { contextBridge, ipcRenderer } = require('electron');
const notesManager = require("./database/notesManager");
const showdown = require("showdown");

const converter = new showdown.Converter();
console.log(converter);

contextBridge.exposeInMainWorld('notesManager', {
  addPage: (title) => notesManager.insertPage(title),
  deletePage: (pageId) => notesManager.deletePage(pageId),
  getPages: () => notesManager.getAllPAges(),
  getPageNotes: (pageId) => notesManager.getPageNotes(pageId),
  addNote: (pageId, text) => notesManager.insertNote(pageId, text),
  convert: (text) => converter.makeHtml(text),
})
