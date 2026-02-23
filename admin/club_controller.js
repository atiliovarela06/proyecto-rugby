const Club = require('../models/club_model');

// LISTAR CLUBES
exports.listarClubes = async (req, res) => {
    const clubes = await Club.getAll();

    res.render('clubes', {
        clubes,
        user: req.session.user
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

// GUARDAR CAMBIOS
exports.actualizarClub = async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;

    await Club.update(id, nombre);
    res.redirect('/admin/clubes');
};

// ELIMINAR
exports.eliminarClub = async (req, res) => {
    const { id } = req.params;
    await Club.delete(id);
    res.redirect('/admin/clubes');
};


// ✅ FIX IMPORTANTE AQUÍ
exports.verMiClub = async (req, res) => {

    const clubId = req.session.user.club_id; // 🔥 antes estaba mal

    if (!clubId) {
        return res.render('mi_club', {
            club: null,
            user: req.session.user
        });
    }

    const club = await Club.getById(clubId);

    res.render('mi_club', {
        club,
        user: req.session.user
    });
};


// VER CLUB
exports.verClub = async (req, res) => {
    try {

        const { id } = req.params;
        const club = await Club.getById(id);

        if (!club) {
            return res.send('Club no encontrado');
        }

        res.render('club_ver', {
            club,
            user: req.session.user
        });

    } catch (error) {
        console.error(error);
        res.send('Error al cargar club');
    }
};