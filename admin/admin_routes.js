const express = require('express');
const router = express.Router();

const clubController = require('./club_controller');
const authMiddleware = require('../auth/auth_middleware');

// LISTAR CLUBES (ADMIN SISTEMA)
router.get(
    '/clubes',
    authMiddleware.verificarLogin,
    authMiddleware.soloAdminSistema,
    clubController.listarClubes
);

// FORM NUEVO CLUB
router.get(
    '/clubes/nuevo',
    authMiddleware.verificarLogin,
    authMiddleware.soloAdminSistema,
    clubController.formNuevoClub
);

// CREAR CLUB
router.post(
    '/clubes/nuevo',
    authMiddleware.verificarLogin,
    authMiddleware.soloAdminSistema,
    clubController.crearClub
);

// FORM EDITAR CLUB
router.get(
    '/clubes/editar/:id',
    authMiddleware.verificarLogin,
    authMiddleware.soloAdminSistema,
    clubController.formEditarClub
);

// GUARDAR EDICIÓN
router.post(
    '/clubes/editar/:id',
    authMiddleware.verificarLogin,
    authMiddleware.soloAdminSistema,
    clubController.actualizarClub
);

// ELIMINAR CLUB
router.post(
    '/clubes/eliminar/:id',
    authMiddleware.verificarLogin,
    authMiddleware.soloAdminSistema,
    clubController.eliminarClub
);

// VER CLUB (viewer / admin)
router.get(
    '/clubes/:id',
    authMiddleware.verificarLogin,
    clubController.verClub
);

module.exports = router;