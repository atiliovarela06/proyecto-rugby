const db = require('../config/db');

exports.getAll = async () => {
    const [rows] = await db.promise().query("SELECT * FROM clubes");
    return rows;
};

exports.create = async (nombre) => {
    await db.promise().query(
        "INSERT INTO clubes (nombre) VALUES (?)",
        [nombre]
    );
};