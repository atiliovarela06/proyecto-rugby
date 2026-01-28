const User = require('../models/user_model');
const bcrypt = require('bcryptjs');

const authController = {

    // Mostrar formulario de login
    showLogin: (req, res) => {
        res.render('login', { error: null });
    },

    // Procesar login
    login: async (req, res) => {
        const { email, password } = req.body;

        try {
            // 1. Buscar usuario por email
            const user = await User.findByEmail(email);

            if (!user) {
                return res.render('login', {
                    error: 'Usuario o contraseña incorrectos'
                });
            }

            // 2. Verificar si está activo
            if (user.activo === 0) {
                return res.render('login', {
                    error: 'Usuario deshabilitado'
                });
            }

            // 3. Comparar contraseña
            const passwordOk = await bcrypt.compare(
                password,
                user.password_hash
            );

            if (!passwordOk) {
                return res.render('login', {
                    error: 'Usuario o contraseña incorrectos'
                });
            }

            // 4. Guardar sesión
            req.session.user = {
                id: user.id,
                nombre: user.nombre,
                rol: user.rol_id,
                club: user.club_id
            };

           // 5. Redirigir según rol
            if (user.rol_id === 1) {
             return res.redirect('/dashboard/admin');
            }

            if (user.rol_id === 2) {
         return res.redirect('/dashboard/club');
            }

        if (user.rol_id === 3) {
         return res.redirect('/dashboard/viewer');
        }

        return res.send("Rol no reconocido");

        } catch (error) {
            console.error(error);
            res.render('login', {
                error: 'Error interno del sistema'
            });
        }
    },

    // Cerrar sesión
    logout: (req, res) => {
        req.session.destroy(() => {
            res.redirect('/login');
        });
    }
};

module.exports = authController;
