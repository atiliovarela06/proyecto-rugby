const db = require('../config/db');

const Torneo = {

    // =========================
    // LISTAR TORNEOS
    // =========================
    getAll: async () => {
        const [rows] = await db.promise().query(
            "SELECT * FROM torneos ORDER BY id DESC"
        );
        return rows;
    },

    // =========================
    // 🔥 NUEVO → OBTENER TORNEO POR ID
    // =========================
    getById: async (id) => {
        const [rows] = await db.promise().query(
            "SELECT * FROM torneos WHERE id = ?",
            [id]
        );
        return rows[0];
    },

    // =========================
    // 🔥 NUEVO → CREAR TORNEO
    // =========================
    create: async ({ nombre, formato, temporada, estado, fecha_inicio, fecha_fin }) => {

        const [result] = await db.promise().query(`
            INSERT INTO torneos
            (nombre, formato, temporada, estado, fecha_inicio, fecha_fin)
            VALUES (?, ?, ?, ?, ?, ?)
        `, [
            nombre,
            formato,
            temporada,
            estado || 'borrador',
            fecha_inicio || null,
            fecha_fin || null
        ]);

        return result.insertId;
    },

    // =========================
    // EQUIPOS DISPONIBLES
    // =========================
    getEquiposDisponibles: async () => {
        const [rows] = await db.promise().query(`
            SELECT e.id, c.nombre AS club, e.categoria
            FROM equipos e
            JOIN clubes c ON c.id = e.club_id
            ORDER BY c.nombre
        `);
        return rows;
    },

    // =========================
    // INSCRIBIR EQUIPOS
    // =========================
    inscribirEquipos: async (torneo_id, equipos) => {

        // borrar previos
        await db.promise().query(
            "DELETE FROM torneo_equipos WHERE torneo_id = ?",
            [torneo_id]
        );

        for (const equipo_id of equipos) {
            await db.promise().query(
                "INSERT INTO torneo_equipos (torneo_id, equipo_id) VALUES (?, ?)",
                [torneo_id, equipo_id]
            );
        }
    },

    // =========================
    // EQUIPOS DEL TORNEO
    // =========================
    getEquiposDelTorneo: async (torneo_id) => {
        const [rows] = await db.promise().query(`
            SELECT e.id, c.nombre AS club, e.categoria
            FROM torneo_equipos te
            JOIN equipos e ON e.id = te.equipo_id
            JOIN clubes c ON c.id = e.club_id
            WHERE te.torneo_id = ?
        `, [torneo_id]);

        return rows;
    },

    // =========================
    // 🔥 NUEVO → FIXTURE DEL TORNEO
    // =========================
    getFixture: async (torneo_id) => {

        const [rows] = await db.promise().query(`
            SELECT 
                p.id,
                p.fecha,
                p.round,
                p.estado,

                cl.nombre AS local_club,
                el.categoria AS local_categoria,

                cv.nombre AS visitante_club,
                ev.categoria AS visitante_categoria,

                r.puntos_local,
                r.puntos_visitante

            FROM partidos p

            JOIN equipos el ON el.id = p.division_local_id
            JOIN clubes cl ON cl.id = el.club_id

            JOIN equipos ev ON ev.id = p.division_visitante_id
            JOIN clubes cv ON cv.id = ev.club_id

            LEFT JOIN resultados r ON r.partido_id = p.id

            WHERE p.torneo_id = ?
            ORDER BY p.round, p.fecha
        `, [torneo_id]);

        return rows;
    }

};

module.exports = Torneo;