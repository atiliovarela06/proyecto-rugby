const db = require('../config/db');
const Torneo = require('../models/torneo_model');


// =========================
// 🔥 LISTAR TORNEOS
// =========================
exports.listarTorneos = async (req, res) => {
    try {

        const torneos = await Torneo.getAll();

        res.render('torneos', {
            torneos,
            user: req.session.user
        });

    } catch (error) {
        console.error(error);
        res.send('Error al listar torneos');
    }
};


// =========================
// 🔥 VER TORNEO (equipos + fixture)
// =========================
exports.verTorneo = async (req, res) => {
    try {

        const { torneo_id } = req.params;

        const torneo = await Torneo.getById(torneo_id);
        const equipos = await Torneo.getEquiposDelTorneo(torneo_id);
        const fixture = await Torneo.getFixture(torneo_id);

        res.render('torneo_ver', {
            torneo,
            equipos,
            fixture,
            user: req.session.user
        });

    } catch (error) {
        console.error(error);
        res.send('Error al ver torneo');
    }
};


// =========================
// 🔥 FORM INSCRIBIR EQUIPOS
// =========================
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


// =========================
// 🔥 GUARDAR INSCRIPCIÓN
// =========================
exports.guardarInscripcion = async (req, res) => {
    try {

        const { torneo_id } = req.params;
        let { equipos } = req.body;

        if (!equipos) equipos = [];

        if (!Array.isArray(equipos)) {
            equipos = [equipos];
        }

        await Torneo.inscribirEquipos(torneo_id, equipos);

        res.redirect(`/admin/torneos/${torneo_id}`);

    } catch (error) {
        console.error(error);
        res.send('Error al inscribir equipos');
    }
};


// =========================
// 🔥 VER FIXTURE SOLO
// =========================
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


// =========================
// 🔥 GENERAR FIXTURE
// =========================
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

        if (lista.length % 2 !== 0) {
            lista.push(null);
        }

        const fechas = lista.length - 1;
        const partidosPorFecha = lista.length / 2;

        let rotacion = [...lista];

        await db.promise().query(`
            DELETE FROM partidos WHERE torneo_id = ?
        `, [torneo_id]);

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
                    (
                        torneo_id,
                        fecha,
                        division_local_id,
                        division_visitante_id,
                        round,
                        numero_fecha,
                        estado
                    )
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

        res.send('🔥 Fixture profesional generado');

    } catch (error) {
        console.error(error);
        res.send('Error generando fixture');
    }
};


// =========================
// 🔥 FORM NUEVO TORNEO
// =========================
exports.formNuevoTorneo = (req, res) => {
    res.render('torneo_nuevo', {
        user: req.session.user
    });
};


// =========================
// 🔥 CREAR TORNEO
// =========================
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