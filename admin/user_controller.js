const bcrypt = require('bcryptjs');
const User = require('../models/user_model');

// =========================
// REGISTRO VIEWER (PÚBLICO)
// =========================
const formRegistro = (req, res) => {
    res.render('usuario_nuevo');
};

const crearViewer = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        if (!nombre || !email || !password) {
            return res.send('Faltan datos obligatorios');
        }

        const emailNormalizado = email.toLowerCase();
        const existente = await User.findByEmail(emailNormalizado);

        if (existente) {
            return res.send('El email ya está registrado');
        }

        await User.create({
            nombre,
            email: emailNormalizado,
            password,
            rol_id: 3,
            club_id: null
        });

        res.redirect('/login');

    } catch (error) {
        console.error(error);
        res.send('Error al crear usuario');
    }
};

// =========================
// ADMIN SISTEMA
// =========================

const listarUsuarios = async (req, res) => {
    try {

        const usuarios = await User.getAll();

        res.render('usuarios', {
            usuarios,
            user: req.session.user
        });

    } catch (error) {
        console.error(error);
        res.send('Error al listar usuarios');
    }
};

const formNuevoAdminClub = async (req, res) => {
    try {
        const Club = require('../models/club_model');
        const clubes = await Club.getAll();

        res.render('admin_usuario_nuevo', {
            clubes,
            user: req.session.user
        });
    } catch (error) {
        console.error(error);
        res.send('Error al cargar formulario');
    }
};

const crearAdminClub = async (req, res) => {
    try {
        const { nombre, email, password, club_id } = req.body;

        if (!nombre || !email || !password || !club_id) {
            return res.send('Faltan datos obligatorios');
        }

        const emailNormalizado = email.toLowerCase();
        const existente = await User.findByEmail(emailNormalizado);

        if (existente) {
            return res.send('El email ya está registrado');
        }

        await User.create({
            nombre,
            email: emailNormalizado,
            password,
            rol: 'admin_club',
            club_id
        });

        res.redirect('/admin/usuarios');

    } catch (error) {
        console.error(error);
        res.send('Error al crear admin de club');
    }
};

//////////////////////////////////////////////////////////
// ✅ NUEVO — FORM EDITAR ROL
//////////////////////////////////////////////////////////

const formEditarRol = async (req, res) => {

    const { id } = req.params;

    const Club = require('../models/club_model');

    const usuario = await User.findById(id);
    const clubes = await Club.getAll();

    res.render('usuario_rol_editar', {
        usuario,
        clubes,
        user: req.session.user
    });
};

//////////////////////////////////////////////////////////
// ✅ NUEVO — ACTUALIZAR ROL
//////////////////////////////////////////////////////////

const actualizarRol = async (req, res) => {

    const { id } = req.params;
    const { rol_id, club_id } = req.body;

    await User.updateRol(
        id,
        Number(rol_id),
        rol_id == 2 ? club_id : null
    );

    res.redirect('/admin/usuarios');
};

module.exports = {
    formRegistro,
    crearViewer,
    listarUsuarios,
    formNuevoAdminClub,
    crearAdminClub,
    formEditarRol,
    actualizarRol
};