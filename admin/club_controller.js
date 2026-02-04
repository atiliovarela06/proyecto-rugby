const Club = require('../models/club_model');

// LISTAR CLUBES
exports.listarClubes = async (req, res) => {
    const clubes = await Club.getAll();

    res.render('clubes', {
        clubes,
        user: req.session.user // importante para mostrar nombre y rol
    });
};

// FORM NUEVO CLUB
exports.formNuevoClub = (req, res) => {
    res.render('club_nuevo', {
        user: req.session.user
    });
};

// CREAR CLUB
exports.crearClub = async (req, res) => {
    const { nombre } = req.body;

    await Club.create(nombre);

    res.redirect('/admin/clubes');
};

// FORM EDITAR CLUB
exports.formEditarClub = async (req, res) => {
    const { id } = req.params;

    const club = await Club.getById(id);

    res.render('club_editar', {
        club,
        user: req.session.user
    });
};

// GUARDAR CAMBIOS EDITAR
exports.actualizarClub = async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;

    await Club.update(id, nombre);

    res.redirect('/admin/clubes');
};

// ELIMINAR CLUB
exports.eliminarClub = async (req, res) => {
    const { id } = req.params;

    await Club.delete(id);

    res.redirect('/admin/clubes');
};
