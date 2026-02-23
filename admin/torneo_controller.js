const db = require('../config/db');
const Torneo = require('../models/torneo_model');

exports.listarTorneos = async (req, res) => {
    try {
        const torneos = await Torneo.getAll();
        res.render('torneos', { torneos, user: req.session.user });
    } catch (error) {
        console.error(error);
        res.send('Error al listar torneos');
    }
};

exports.verTorneo = async (req, res) => {
    try {

        const { torneo_id } = req.params;

        const torneo = await Torneo.getById(torneo_id);
        const equipos = await Torneo.getEquiposDelTorneo(torneo_id);
        const fixture = await Torneo.getFixture(torneo_id);

        // 🔥 IMPORTANTE → recalcular siempre antes de mostrar
        await Torneo.recalcularTabla(torneo_id);

        const tabla = await Torneo.getTabla(torneo_id);

        res.render('torneo_ver', {
            torneo,
            equipos,
            fixture,
            tabla,
            user: req.session.user
        });

    } catch (error) {
        console.error(error);
        res.send('Error al ver torneo');
    }
};

exports.formInscribirEquipos = async (req, res) => {
    try {

        const { torneo_id } = req.params;

        const torneo = await Torneo.getById(torneo_id);
        const equiposDisponibles = await Torneo.getEquiposDisponibles();
        const equiposActuales = await Torneo.getEquiposDelTorneo(torneo_id);

        res.render('torneo_inscribir', {
            torneo,
            equiposDisponibles,
            equiposActuales,
            user: req.session.user
        });

    } catch (error) {
        console.error(error);
        res.send('Error al cargar inscripción');
    }
};

exports.guardarInscripcion = async (req, res) => {
    try {

        const { torneo_id } = req.params;
        let { equipos } = req.body;

        if (!equipos) equipos = [];
        if (!Array.isArray(equipos)) equipos = [equipos];

        await Torneo.inscribirEquipos(torneo_id, equipos);

        // 🔥 asegurar tabla actualizada
        await Torneo.recalcularTabla(torneo_id);

        res.redirect(`/admin/torneos/${torneo_id}`);

    } catch (error) {
        console.error(error);
        res.send('Error al inscribir equipos');
    }
};

exports.verFixture = async (req, res) => {
    try {

        const { torneo_id } = req.params;

        const torneo = await Torneo.getById(torneo_id);
        const fixture = await Torneo.getFixture(torneo_id);

        res.render('torneo_fixture', {
            torneo,
            fixture,
            user: req.session.user
        });

    } catch (error) {
        console.error(error);
        res.send('Error al cargar fixture');
    }
};

exports.formResultado = async (req, res) => {
    try {

        const { partido_id } = req.params;

        const [[partido]] = await db.promise().query(`
            SELECT 
                p.id,
                p.torneo_id,
                cl.nombre AS local_club,
                el.categoria AS local_categoria,
                cv.nombre AS visitante_club,
                ev.categoria AS visitante_categoria
            FROM partidos p
            JOIN equipos el ON el.id = p.equipo_local_id
            JOIN clubes cl ON cl.id = el.club_id
            JOIN equipos ev ON ev.id = p.equipo_visitante_id
            JOIN clubes cv ON cv.id = ev.club_id
            WHERE p.id = ?
        `, [partido_id]);

        if (!partido) return res.send('Partido no encontrado');

        const [[resultado]] = await db.promise().query(
            "SELECT * FROM resultados WHERE partido_id = ?",
            [partido_id]
        );

        res.render('partido_resultado', {
            partido,
            resultado,
            user: req.session.user
        });

    } catch (error) {
        console.error(error);
        res.send('Error al cargar resultado');
    }
};

exports.guardarResultado = async (req, res) => {
    try {

        const { partido_id } = req.params;
        const { puntos_local, puntos_visitante } = req.body;

        const [[existe]] = await db.promise().query(
            "SELECT partido_id FROM resultados WHERE partido_id = ?",
            [partido_id]
        );

        if (existe) {

            await db.promise().query(`
                UPDATE resultados
                SET puntos_local=?, puntos_visitante=?
                WHERE partido_id=?
            `, [puntos_local, puntos_visitante, partido_id]);

        } else {

            await db.promise().query(`
                INSERT INTO resultados
                (partido_id, puntos_local, puntos_visitante)
                VALUES (?, ?, ?)
            `, [partido_id, puntos_local, puntos_visitante]);

        }

        await db.promise().query(
            "UPDATE partidos SET estado='jugado' WHERE id=?",
            [partido_id]
        );

        // 🔥 obtener torneo
        const [[partido]] = await db.promise().query(
            "SELECT torneo_id FROM partidos WHERE id=?",
            [partido_id]
        );

        if (!partido) return res.send('Partido sin torneo');

        // 🔥 RECALCULAR TABLA SIEMPRE
        await Torneo.recalcularTabla(partido.torneo_id);

        res.redirect(`/admin/torneos/${partido.torneo_id}`);

    } catch (error) {
        console.error(error);
        res.send('Error guardando resultado');
    }
};

exports.generarFixture = async (req, res) => {
    try {

        const { torneo_id } = req.params;

        const [equipos] = await db.promise().query(`
            SELECT equipo_id
            FROM torneo_equipos
            WHERE torneo_id = ?
        `, [torneo_id]);

        if (equipos.length < 2) {
            return res.send('No hay suficientes equipos');
        }

        let lista = equipos.map(e => e.equipo_id);
        if (lista.length % 2 !== 0) lista.push(null);

        const fechas = lista.length - 1;
        const partidosPorFecha = lista.length / 2;
        let rotacion = [...lista];

        await db.promise().query(
            "DELETE FROM partidos WHERE torneo_id = ?",
            [torneo_id]
        );

        for (let fecha = 0; fecha < fechas; fecha++) {

            for (let i = 0; i < partidosPorFecha; i++) {

                let local = rotacion[i];
                let visitante = rotacion[rotacion.length - 1 - i];

                if (!local || !visitante) continue;

                if (fecha % 2 === 1) {
                    [local, visitante] = [visitante, local];
                }

                await db.promise().query(`
                    INSERT INTO partidos
                    (torneo_id, fecha, equipo_local_id, equipo_visitante_id, round, numero_fecha, estado)
                    VALUES (?, NOW(), ?, ?, ?, ?, 'pendiente')
                `, [
                    torneo_id,
                    local,
                    visitante,
                    `Fecha ${fecha + 1}`,
                    fecha + 1
                ]);
            }

            rotacion.splice(1, 0, rotacion.pop());
        }

        // 🔥 recalcular por si había resultados previos
        await Torneo.recalcularTabla(torneo_id);

        res.redirect(`/admin/torneos/${torneo_id}`);

    } catch (error) {
        console.error(error);
        res.send('Error generando fixture');
    }
};

exports.formNuevoTorneo = (req, res) => {
    res.render('torneo_nuevo', { user: req.session.user });
};

exports.crearTorneo = async (req, res) => {
    try {

        const { nombre, formato, temporada } = req.body;

        await db.promise().query(
            "INSERT INTO torneos (nombre, formato, temporada) VALUES (?, ?, ?)",
            [nombre, formato, temporada]
        );

        res.redirect('/admin/torneos');

    } catch (error) {
        console.error(error);
        res.send('Error creando torneo');
    }
};