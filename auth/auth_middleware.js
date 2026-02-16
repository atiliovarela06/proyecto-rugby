const authMiddleware = {

    verificarLogin: (req, res, next) => {
        if (!req.session.user) {
            return res.redirect('/login');
        }
        next();
    },

    soloAdminSistema: (req, res, next) => {
        if (Number(req.session.user.rol_id) !== 1) {
            return res.status(403).send('Acceso denegado');
        }
        next();
    },

    soloAdminClub: (req, res, next) => {
        if (req.session.user.rol_id !== 2) {
            return res.status(403).send('Acceso denegado');
        }
        next();
    },

    soloViewer: (req, res, next) => {
        if (req.session.user.rol_id !== 3) {
            return res.status(403).send('Acceso denegado');
        }
        next();
    },

    // 👇 OPCIONAL pero MUY útil
    soloAdminSistemaOClub: (req, res, next) => {
        if (![1, 2].includes(req.session.user.rol_id)) {
            return res.status(403).send('Acceso denegado');
        }
        next();
    }
};

module.exports = authMiddleware;