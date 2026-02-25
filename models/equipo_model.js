const db = require('../config/db');

const Equipo = {

    getAll: async () => {
        const [rows] = await db.promise().query(`
            SELECT 
                e.id,
                e.club_id,
                e.activo,
                c.nombre AS club,
                e.categoria,
                d.nombre AS division
            FROM equipos e
            JOIN clubes c ON c.id = e.club_id
            LEFT JOIN divisiones d ON d.id = e.division_id
            ORDER BY c.nombre, e.categoria
        `);
        return rows;
    },

    getByClub: async (club_id) => {
        const [rows] = await db.promise().query(`
            SELECT 
                e.id,
                e.club_id,
                e.activo,
                c.nombre AS club,
                e.categoria,
                d.nombre AS division
            FROM equipos e
            JOIN clubes c ON c.id = e.club_id
            LEFT JOIN divisiones d ON d.id = e.division_id
            WHERE e.club_id = ?
            ORDER BY e.categoria
        `,[club_id]);
        return rows;
    },

    getById: async (id) => {
        const [rows] = await db.promise().query(
            "SELECT * FROM equipos WHERE id = ?",
            [id]
        );
        return rows[0];
    },

    create: async ({ club_id, categoria, division_id, activo }) => {
        await db.promise().query(`
            INSERT INTO equipos
            (club_id, categoria, division_id, activo)
            VALUES (?, ?, ?, ?)
        `,[club_id, categoria, division_id, activo]);
    },

    update: async (id, { club_id, categoria, division_id, activo }) => {
        await db.promise().query(`
            UPDATE equipos
            SET club_id=?, categoria=?, division_id=?, activo=?
            WHERE id=?
        `,[club_id, categoria, division_id, activo, id]);
    },

    delete: async (id) => {
        await db.promise().query(
            "DELETE FROM equipos WHERE id=?",
            [id]
        );
    }
};

module.exports = Equipo;