const Equipo = require('../models/equipo_model');
const Club = require('../models/club_model');
const Division = require('../models/division_model');

exports.listarEquipos = async (req, res) => {

    const equipos = await Equipo.getAll();

    res.render('equipos', {
        equipos,
        user: req.session.user
    });
};

exports.formNuevoEquipo = async (req, res) => {

    const clubes = await Club.getAll();
    const divisiones = await Division.getAll();

    res.render('equipo_nuevo', {
        clubes,
        divisiones,
        user: req.session.user
    });
};

exports.crearEquipo = async (req, res) => {

    const { club_id, categoria, division_id } = req.body;

    await Equipo.create({
        club_id,
        categoria,
        division_id
    });

    res.redirect('/admin/equipos');
};

exports.formEditarEquipo = async (req, res) => {

    const equipo = await Equipo.getById(req.params.id);
    const clubes = await Club.getAll();
    const divisiones = await Division.getAll();

    res.render('equipo_editar', {
        equipo,
        clubes,
        divisiones,
        user: req.session.user
    });
};

exports.actualizarEquipo = async (req, res) => {

    const { club_id, categoria, division_id } = req.body;

    await Equipo.update(req.params.id, {
        club_id,
        categoria,
        division_id
    });

    res.redirect('/admin/equipos');
};

exports.eliminarEquipo = async (req, res) => {

    await Equipo.delete(req.params.id);

    res.redirect('/admin/equipos');
};