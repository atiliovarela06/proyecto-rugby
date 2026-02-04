const db = require('../config/db');

//listar todos los clubes
exports.getAll = async () => {
    const [rows] = await db.promise().query("SELECT * FROM clubes");
    return rows;
};
//crear club
exports.create = async (nombre) => {
    await db.promise().query(
        "INSERT INTO clubes (nombre) VALUES (?)",
        [nombre]
    );
};

//obtener club por id
exports.getById = async (id) => {
    const [rows] = await db.promise().query(
        "SELECT * FROM clubes WHERE id = ?",
        [id]
    );
    return rows[0];
};
// actualizar club
exports.update = async (id, nombre) => {
    await db.promise().query(
        "UPDATE clubes SET nombre = ? WHERE id = ?",
        [nombre, id]
    );
};
//eliminar club
exports.delete = async (id) => {
    await db.promise().query(
        "DELETE FROM clubes WHERE id = ?",
        [id]
    );
};
