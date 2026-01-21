const authMiddleware = {

    // Verifica que el usuario esté logueado
    verificarLogin: (req, res, next) => {
        if (!req.session.user) {
            return res.redirect('/login');
        }
        next();
    },

    // Solo admin del sistema
    soloAdminSistema: (req, res, next) => {
        if (!req.session.user) {
            return res.redirect('/login');
        }

        // rol_id = 1 → admin_sistema
        if (req.session.user.rol !== 1) {
            return res.status(403).send('Acceso denegado');
        }

        next();
    },

    // Solo admin del club
    soloAdminClub: (req, res, next) => {
        if (!req.session.user) {
            return res.redirect('/login');
        }

        // rol_id = 2 → admin_club
        if (req.session.user.rol !== 2) {
            return res.status(403).send('Acceso denegado');
        }

        next();
    },

    // Viewer (solo consulta)
    soloViewer: (req, res, next) => {
        if (!req.session.user) {
            return res.redirect('/login');
        }

        // rol_id = 3 → viewer
        if (req.session.user.rol !== 3) {
            return res.status(403).send('Acceso denegado');
        }

        next();
    }

};

module.exports = authMiddleware;
