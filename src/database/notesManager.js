const dbManager = require("./dbManager");
const db = dbManager.db;

const insertPage = (title) => {
    try {
        const insertQuery = db.prepare("INSERT INTO Pages(Title) VALUES (?)");
        const info = insertQuery.run(title);
        const newPage = getPage(info.lastInsertRowid);
        return {success: true, data: newPage};

    } catch (err) {
        console.error(err)
        if (err.code == "SQLITE_CONSTRAINT_UNIQUE") return {success: false, error: "Page title's must be unique"};
        else return {success: false, error: "Failed to create new page"}
    }
}

const deletePage = (pageId) => {
    try {
        console.log(pageId);
        const deleteQuery = db.prepare("DELETE FROM Pages WHERE PageId = ?")
        const info = deleteQuery.run(pageId);
        if (info.changes == 1) return {success: true, msg: "Page deleted successfully!"}
        else return {success: false, error: "Failed to delete page..."}
    } catch (err) {
        console.log(err);
        return {success: false, error: "Failed to delete page..."}
    }
}

const updatePage = (id, newTitle) => {
    try {
        const updateQuery = db.prepare("UPDATE Pages set Title = ? WHERE PageId = ?");

        const transaction = db.transaction(() => {
            const info = updateQuery.run();
        })

    } catch (err) {
        console.error(err);
        throw err
    }
}

const getPage = (id) => {
    try {
        const getQuery = db.prepare("SELECT * FROM Pages WHERE PageId = ?");

        const info = getQuery.get(id);
            return info;
        
    } catch (err) {
        console.error(err)
        throw err
    }
}

const getAllPAges = () => {
    try {

        const getQuery = db.prepare("SELECT * FROM Pages");
        const info = getQuery.all();
        return info;

    } catch (err) {
        console.log(err);
        throw err
    }
}

const getPageNotes = (pageId) => {
    try {
        const getQuery = db.prepare("SELECT * FROM Notes WHERE PageId = ?");
        const notes = getQuery.all(pageId);
        return {success: true, data: notes};
    } catch (err) {
        console.log(err);
        return {success: false, error: err};
    }
}

const insertNote = (pageId, text) => {
    try {
        const insertQuery = db.prepare("INSERT INTO Notes(PageId, Text) VALUES(?, ?)");
        const info = insertQuery.run(pageId, text);

        if (info.changes == 1) {
            const note = getNote(info.lastInsertRowid);
            return {success: true, data: note};
        } else {
            return {success: false, error: "Failed to add new note..."};
        }

    } catch (err) {
        console.log(err);
        return {success: false, error: err};
    }
}

const getNote = (noteId) => {
    try {
        const getQuery = db.prepare("SELECT * FROM Notes WHERE NoteId = ?");
        const note = getQuery.get(noteId);
        return note;
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    insertPage,
    deletePage,
    updatePage,
    getAllPAges,
    getPageNotes,
    insertNote
}