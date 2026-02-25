const Equipo = require('../models/equipo_model');
const Club = require('../models/club_model');
const Division = require('../models/division_model');

exports.listarEquipos = async (req, res) => {

    const user = req.session.user;
    let equipos = [];

    if (Number(user.rol_id) === 1) {

        equipos = await Equipo.getAll();

    } else if (Number(user.rol_id) === 2) {

        if (!user.club_id) {
            return res.send('Tu usuario no tiene club asignado');
        }

        equipos = await Equipo.getByClub(user.club_id);
    }

    res.render('equipos', {
        equipos,
        user
    });
};

exports.formNuevoEquipo = async (req, res) => {

    const user = req.session.user;
    const divisiones = await Division.getAll();

    let clubes;

    if (Number(user.rol_id) === 1) {
        clubes = await Club.getAll();
    } else {
        clubes = [{ id: user.club_id, nombre: "Mi Club" }];
    }

    res.render('equipo_nuevo', {
        clubes,
        divisiones,
        user
    });
};

exports.crearEquipo = async (req, res) => {

    const user = req.session.user;
    let { club_id, categoria, division_id, activo } = req.body;

    if (Number(user.rol_id) === 2) {
        club_id = user.club_id;
    }

    await Equipo.create({
        club_id,
        categoria,
        division_id,
        activo: activo ? 1:0
    });

    res.redirect('/admin/equipos');
};

exports.formEditarEquipo = async (req, res) => {

    const user = req.session.user;

    const equipo = await Equipo.getById(req.params.id);
    const divisiones = await Division.getAll();

    if (!equipo) return res.send('Equipo no encontrado');

    if (Number(user.rol_id) === 2 && Number(equipo.club_id) !== Number(user.club_id)) {
        return res.status(403).send('No podés editar equipos de otro club');
    }

    let clubes;

    if (Number(user.rol_id) === 1) {
        clubes = await Club.getAll();
    } else {
        clubes = [{ id: user.club_id, nombre: "Mi Club" }];
    }

    res.render('equipo_editar', {
        equipo,
        clubes,
        divisiones,
        user
    });
};

exports.actualizarEquipo = async (req, res) => {

    const user = req.session.user;
    let { club_id, categoria, division_id, activo } = req.body;

    if (Number(user.rol_id) === 2) {
        club_id = user.club_id;
    }

    await Equipo.update(req.params.id, {
        club_id,
        categoria,
        division_id,
        activo: activo ? 1:0
    });

    res.redirect('/admin/equipos');
};

exports.eliminarEquipo = async (req, res) => {

    const user = req.session.user;

    const equipo = await Equipo.getById(req.params.id);

    if (!equipo) return res.send('Equipo no encontrado');

    if (Number(user.rol_id) === 2 && Number(equipo.club_id) !== Number(user.club_id)) {
        return res.status(403).send('No podés eliminar equipos de otro club');
    }

    await Equipo.delete(req.params.id);

    res.redirect('/admin/equipos');
};