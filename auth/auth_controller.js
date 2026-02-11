const User = require('../models/user_model');
const bcrypt = require('bcryptjs');

const authController = {

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

            // ✅ SESIÓN CORRECTA
            req.session.user = {
                id: user.id,
                nombre: user.nombre,
                rol_id: user.rol_id,
                club_id: user.club_id
            };

            // Redirección por rol
            if (Number(user.rol_id) === 1) return res.redirect('/dashboard/admin');
            if (Number(user.rol_id) === 2) return res.redirect('/dashboard/club');
            if (Number(user.rol_id) === 3) return res.redirect('/dashboard/viewer');

            return res.send('Rol no reconocido');

        } catch (error) {
            console.error(error);
            res.render('login', { error: 'Error interno del sistema' });
        }
    },

    logout: (req, res) => {
        req.session.destroy(() => {
            res.redirect('/login');
        });
    }
};

module.exports = authController;
