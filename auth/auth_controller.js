const User = require('../models/user_model');
const bcrypt = require('bcryptjs');

const authController = {

    // ======================
    // LOGIN
    // ======================
    showLogin: (req, res) => {
        res.render('login', { error: null });
    },

    login: async (req, res) => {
        const { email, password } = req.body;

        try {
            const user = await User.findByEmail(email);

            if (!user) {
                return res.render('login', { error: 'Usuario o contraseña incorrectos' });
            }

            if (user.activo === 0) {
                return res.render('login', { error: 'Usuario deshabilitado' });
            }

            const passwordOk = await bcrypt.compare(password, user.password_hash);

            if (!passwordOk) {
                return res.render('login', { error: 'Usuario o contraseña incorrectos' });
            }

            req.session.user = {
                id: user.id,
                nombre: user.nombre,
                rol_id: user.rol_id,
                club_id: user.club_id
            };

            if (Number(user.rol_id) === 1) return res.redirect('/dashboard/admin');
            if (Number(user.rol_id) === 2) return res.redirect('/dashboard/club');
            if (Number(user.rol_id) === 3) return res.redirect('/dashboard/viewer');

            return res.send('Rol no reconocido');

        } catch (error) {
            console.error(error);
            res.render('login', { error: 'Error interno del sistema' });
        }
    },

    // ======================
    // REGISTRO USUARIO
    // ======================
    showRegistro: (req, res) => {
        res.render('registro', { error: null });
    },

    registrar: async (req, res) => {
        try {

            const { nombre, email, password } = req.body;

            if (!nombre || !email || !password) {
                return res.render('registro', { error: 'Completa todos los campos' });
            }

            const existe = await User.findByEmail(email);

            if (existe) {
                return res.render('registro', { error: 'El email ya está registrado' });
            }

            // ✅ IMPORTANTE:
            // El modelo User.create ya genera el hash,
            // así que debemos pasar "password", NO "password_hash"
            await User.create({
                nombre,
                email,
                password,      // ← CLAVE
                rol_id: 3,
                club_id: null,
                activo: 1
            });

            res.redirect('/login');

        } catch (error) {
            console.error(error);

            // ✅ ESTA ES LA CORRECCIÓN CRÍTICA
            res.render('registro', {
                error: error.sqlMessage || error.message || 'Error al registrar usuario'
            });
        }
    },

    // ======================
    // LOGOUT
    // ======================
    logout: (req, res) => {
        req.session.destroy(() => {
            res.redirect('/login');
        });
    }

};

module.exports = authController;
