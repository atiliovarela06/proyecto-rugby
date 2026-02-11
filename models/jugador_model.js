const db = require('../config/db');

const Jugador = {

    getByClub: async (club_id) => {
        const [rows] = await db.promise().query(
            `SELECT 
                id,
                dni,
                nombre,
                apellido,
                fecha_nacimiento,
                posicion,
                categoria_id,
                activo
             FROM jugadores
             WHERE club_id = ?`,
            [club_id]
        );

        return rows;
    },

    getById: async (id, club_id) => {
        const [rows] = await db.promise().query(
            `SELECT * FROM jugadores WHERE id = ? AND club_id = ?`,
            [id, club_id]
        );
        return rows[0];
    },

    create: async (data) => {
        const {
            dni,
            nombre,
            apellido,
            fecha_nacimiento,
            posicion,
            categoria_id,
            club_id
        } = data;

        await db.promise().query(
            `INSERT INTO jugadores
            (dni, nombre, apellido, fecha_nacimiento, posicion, categoria_id, activo, club_id)
            VALUES (?, ?, ?, ?, ?, ?, 1, ?)`,
            [
                dni,
                nombre,
                apellido,
                fecha_nacimiento,
                posicion,
                categoria_id,
                club_id
            ]
        );
    },

    update: async (id, club_id, data) => {
        const {
            dni,
            nombre,
            apellido,
            fecha_nacimiento,
            posicion,
            categoria_id,
            activo
        } = data;

        await db.promise().query(
            `UPDATE jugadores SET
                dni = ?,
                nombre = ?,
                apellido = ?,
                fecha_nacimiento = ?,
                posicion = ?,
                categoria_id = ?,
                activo = ?
             WHERE id = ? AND club_id = ?`,
            [
                dni,
                nombre,
                apellido,
                fecha_nacimiento,
                posicion,
                categoria_id,
                activo,
                id,
                club_id
            ]
        );
    }

};

module.exports = Jugador;



