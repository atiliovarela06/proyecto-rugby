const express = require('express');
const router = express.Router();

const adminController = require('./admin_controller');
const authMiddleware = require('../auth/auth_middleware');

// Ruta: listado de clubes (solo admin sistema)
router.get('/admin/clubes',
    authMiddleware.verificarLogin,
    authMiddleware.soloAdminSistema,
    adminController.listarClubes
);

// FORM NUEVO CLUB
router.get('/admin/clubes/nuevo',
    authMiddleware.verificarLogin,
    authMiddleware.soloAdminSistema,
    adminController.formNuevoClub
);

// GUARDAR CLUB
router.post('/admin/clubes/nuevo',
    authMiddleware.verificarLogin,
    authMiddleware.soloAdminSistema,
    adminController.crearClub
);

module.exports = router;