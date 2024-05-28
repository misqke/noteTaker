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

module.exports = {
    insertPage,
    updatePage,
    getAllPAges
}