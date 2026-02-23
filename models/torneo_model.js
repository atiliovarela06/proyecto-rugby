const db = require('../config/db');

const Torneo = {

    // =========================
    // LISTAR
    // =========================
    getAll: async () => {
        const [rows] = await db.promise().query(
            "SELECT * FROM torneos ORDER BY id DESC"
        );
        return rows;
    },

    // =========================
    // POR ID
    // =========================
    getById: async (id) => {
        const [rows] = await db.promise().query(
            "SELECT * FROM torneos WHERE id = ?",
            [id]
        );
        return rows[0];
    },

    // =========================
    // CREAR
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
            ORDER BY c.nombre, e.categoria
        `);
        return rows;
    },

    // =========================
    // INSCRIBIR EQUIPOS
    // =========================
    inscribirEquipos: async (torneo_id, equipos) => {

        await db.promise().query(
            "DELETE FROM torneo_equipos WHERE torneo_id = ?",
            [torneo_id]
        );

        for (const equipo_id of equipos) {

            await db.promise().query(
                "INSERT INTO torneo_equipos (torneo_id, equipo_id) VALUES (?, ?)",
                [torneo_id, equipo_id]
            );

            // crear fila base tabla
            await db.promise().query(`
                INSERT IGNORE INTO tabla_posiciones
                (torneo_id, equipo_id, pj, pg, pe, pp, pf, pc, dif, pts)
                VALUES (?, ?, 0,0,0,0,0,0,0,0)
            `, [torneo_id, equipo_id]);
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
            ORDER BY c.nombre, e.categoria
        `, [torneo_id]);

        return rows;
    },

    // =========================
    // FIXTURE
    // =========================
    getFixture: async (torneo_id) => {

        const [rows] = await db.promise().query(`
            SELECT 
                p.id,
                p.numero_fecha,
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
            JOIN equipos el ON el.id = p.equipo_local_id
            JOIN clubes cl ON cl.id = el.club_id
            JOIN equipos ev ON ev.id = p.equipo_visitante_id
            JOIN clubes cv ON cv.id = ev.club_id
            LEFT JOIN resultados r ON r.partido_id = p.id
            WHERE p.torneo_id = ?
            ORDER BY p.numero_fecha, p.fecha
        `, [torneo_id]);

        return rows;
    },

    // =========================
    // TABLA POSICIONES
    // =========================
    getTabla: async (torneo_id) => {

        const [rows] = await db.promise().query(`
            SELECT 
                c.nombre AS club,
                e.categoria,
                t.pj,
                t.pg,
                t.pe,
                t.pp,
                t.pf,
                t.pc,
                t.dif,
                t.pts
            FROM tabla_posiciones t
            JOIN equipos e ON e.id = t.equipo_id
            JOIN clubes c ON c.id = e.club_id
            WHERE t.torneo_id = ?
            ORDER BY t.pts DESC, t.dif DESC, t.pf DESC
        `, [torneo_id]);

        return rows;
    },

    // =========================
    // 🔥 RECALCULAR TABLA (CLAVE)
    // =========================
    recalcularTabla: async (torneo_id) => {

        // reset
        await db.promise().query(`
            UPDATE tabla_posiciones
            SET pj=0,pg=0,pe=0,pp=0,pf=0,pc=0,dif=0,pts=0
            WHERE torneo_id=?
        `,[torneo_id]);

        // partidos jugados
        const [partidos] = await db.promise().query(`
            SELECT p.equipo_local_id,p.equipo_visitante_id,
                   r.puntos_local,r.puntos_visitante
            FROM partidos p
            JOIN resultados r ON r.partido_id=p.id
            WHERE p.torneo_id=? AND p.estado='jugado'
        `,[torneo_id]);

        for(const p of partidos){

            const L=p.equipo_local_id;
            const V=p.equipo_visitante_id;
            const PL=Number(p.puntos_local);
            const PV=Number(p.puntos_visitante);

            // local stats
            await db.promise().query(`
                UPDATE tabla_posiciones
                SET pj=pj+1,pf=pf+?,pc=pc+?
                WHERE torneo_id=? AND equipo_id=?
            `,[PL,PV,torneo_id,L]);

            // visitante stats
            await db.promise().query(`
                UPDATE tabla_posiciones
                SET pj=pj+1,pf=pf+?,pc=pc+?
                WHERE torneo_id=? AND equipo_id=?
            `,[PV,PL,torneo_id,V]);

            if(PL>PV){
                await db.promise().query(`
                    UPDATE tabla_posiciones SET pg=pg+1,pts=pts+4
                    WHERE torneo_id=? AND equipo_id=?
                `,[torneo_id,L]);

                await db.promise().query(`
                    UPDATE tabla_posiciones SET pp=pp+1
                    WHERE torneo_id=? AND equipo_id=?
                `,[torneo_id,V]);

            }else if(PV>PL){
                await db.promise().query(`
                    UPDATE tabla_posiciones SET pg=pg+1,pts=pts+4
                    WHERE torneo_id=? AND equipo_id=?
                `,[torneo_id,V]);

                await db.promise().query(`
                    UPDATE tabla_posiciones SET pp=pp+1
                    WHERE torneo_id=? AND equipo_id=?
                `,[torneo_id,L]);

            }else{
                await db.promise().query(`
                    UPDATE tabla_posiciones SET pe=pe+1,pts=pts+2
                    WHERE torneo_id=? AND equipo_id IN (?,?)
                `,[torneo_id,L,V]);
            }
        }

        await db.promise().query(`
            UPDATE tabla_posiciones SET dif=pf-pc WHERE torneo_id=?
        `,[torneo_id]);
    }

};

module.exports = Torneo;