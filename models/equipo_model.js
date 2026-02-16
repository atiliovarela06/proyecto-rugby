const db = require('../config/db');

const Equipo = {

    getAll: async () => {
        const [rows] = await db.promise().query(`
            SELECT 
                e.id,
                c.nombre AS club,
                e.categoria,
                d.nombre AS division
            FROM equipos e
            JOIN clubes c ON c.id = e.club_id
            LEFT JOIN divisiones d ON d.id = e.division_id
            ORDER BY c.nombre
        `);

        return rows;
    },

    getById: async (id) => {
        const [rows] = await db.promise().query(
            "SELECT * FROM equipos WHERE id = ?",
            [id]
        );
        return rows[0];
    },

    create: async (data) => {
        const { club_id, categoria, division_id } = data;

        await db.promise().query(`
            INSERT INTO equipos
            (club_id, categoria, division_id)
            VALUES (?, ?, ?)
        `, [club_id, categoria, division_id]);
    },

    update: async (id, data) => {
        const { club_id, categoria, division_id } = data;

        await db.promise().query(`
            UPDATE equipos
            SET club_id=?, categoria=?, division_id=?
            WHERE id=?
        `, [club_id, categoria, division_id, id]);
    },

    delete: async (id) => {
        await db.promise().query(
            "DELETE FROM equipos WHERE id=?",
            [id]
        );
    }

};

module.exports = Equipo;