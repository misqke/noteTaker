const Database = require("better-sqlite3");
const path = require("path");

// const dbPath = 
//     process.env.NODE_ENV === "development" 
//         ? "./noteTaker.db" 
//         : path.join(process.resourcesPath, "./noteTaker.db");

const dbPath = "./noteTaker.db";

const db = new Database(dbPath);
db.pragma("journal_mode = WAL");

const pagesPrep = db.prepare("CREATE TABLE IF NOT EXISTS Pages(PageId INTEGER PRIMARY KEY AUTOINCREMENT, Title TEXT not null unique)");
const notesPrep = db.prepare("CREATE TABLE IF NOT EXISTS Notes(NoteId INTEGER PRIMARY KEY AUTOINCREMENT, PageId INTEGER not null, Text text not null)");
pagesPrep.run();
notesPrep.run();


module.exports.db = db;