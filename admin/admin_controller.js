const db = require('../config/db');
const Club = require('../models/club_model');

// LISTAR CLUBES
exports.listarClubes = (req, res) => {

    db.query("SELECT * FROM clubes", (err, resultados) => {

        if (err) {
            console.log(err);
            return res.send("Error cargando clubes");
        }

        res.render("clubes", {
            user: req.session.user,
            clubes: resultados
        });

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

    const club = await Club.getById(req.params.id);

    if (!club) {
        return res.send("Club no encontrado");
    }

    res.render('club_editar', {
        club,
        user: req.session.user
    });
};

// EDITAR CLUB
exports.editarClub = async (req, res) => {

    const { nombre } = req.body;

    await Club.update(req.params.id, nombre);

    res.redirect('/admin/clubes');
};

// ELIMINAR CLUB
exports.eliminarClub = async (req, res) => {

    await Club.delete(req.params.id);

    res.redirect('/admin/clubes');
};