const express = require('express');
const router = express.Router();

const equipoController = require('./equipo_controller');
const authMiddleware = require('../auth/auth_middleware');

// LISTAR
router.get(
    '/equipos',
    authMiddleware.verificarLogin,
    authMiddleware.soloAdminSistemaOClub,
    equipoController.listarEquipos
);

// FORM NUEVO
router.get(
    '/equipos/nuevo',
    authMiddleware.verificarLogin,
    authMiddleware.soloAdminSistemaOClub,
    equipoController.formNuevoEquipo
);

// CREAR
router.post(
    '/equipos/nuevo',
    authMiddleware.verificarLogin,
    authMiddleware.soloAdminSistemaOClub,
    equipoController.crearEquipo
);

// FORM EDITAR
router.get(
    '/equipos/editar/:id',
    authMiddleware.verificarLogin,
    authMiddleware.soloAdminSistemaOClub,
    equipoController.formEditarEquipo
);

// GUARDAR EDICIÓN
router.post(
    '/equipos/editar/:id',
    authMiddleware.verificarLogin,
    authMiddleware.soloAdminSistemaOClub,
    equipoController.actualizarEquipo
);

// ELIMINAR
router.post(
    '/equipos/eliminar/:id',
    authMiddleware.verificarLogin,
    authMiddleware.soloAdminSistemaOClub,
    equipoController.eliminarEquipo
);

module.exports = router;