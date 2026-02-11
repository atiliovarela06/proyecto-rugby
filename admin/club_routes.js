const express = require('express');
const router = express.Router();

const clubController = require('./club_controller');
const authMiddleware = require('../auth/auth_middleware');


// LISTAR CLUBES (todos logueados)
router.get(
    '/clubes',
    authMiddleware.verificarLogin,
    clubController.listarClubes
);


// CREAR CLUB (solo admin sistema)
router.get(
    '/clubes/nuevo',
    authMiddleware.verificarLogin,
    authMiddleware.soloAdminSistema,
    clubController.formNuevoClub
);

router.post(
    '/clubes/nuevo',
    authMiddleware.verificarLogin,
    authMiddleware.soloAdminSistema,
    clubController.crearClub
);


// EDITAR CLUB
router.get(
    '/clubes/editar/:id',
    authMiddleware.verificarLogin,
    authMiddleware.soloAdminSistema,
    clubController.formEditarClub
);

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


// ADMIN CLUB → ver su club
router.get(
    '/mi-club',
    authMiddleware.verificarLogin,
    authMiddleware.soloAdminClub,
    clubController.verMiClub
);


// VER UN CLUB (viewer también)
router.get(
    '/clubes/:id',
    authMiddleware.verificarLogin,
    clubController.verClub
);

module.exports = router;