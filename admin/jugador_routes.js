const express = require('express');
const router = express.Router();

const jugadorController = require('./jugador_controller');
const authMiddleware = require('../auth/auth_middleware');

// ===============================
// LISTAR JUGADORES
// ===============================
router.get(
    '/jugadores',
    authMiddleware.verificarLogin,
    authMiddleware.soloAdminClub,
    jugadorController.listarJugadores
);

// ===============================
// FORM NUEVO JUGADOR
// ===============================
router.get(
    '/jugadores/nuevo',
    authMiddleware.verificarLogin,
    authMiddleware.soloAdminClub,
    jugadorController.formNuevoJugador
);

// ===============================
// CREAR JUGADOR
// ===============================
router.post(
    '/jugadores/nuevo',
    authMiddleware.verificarLogin,
    authMiddleware.soloAdminClub,
    jugadorController.crearJugador
);

// ===============================
// FORM EDITAR JUGADOR ✅
// ===============================
router.get(
    '/jugadores/editar/:id',
    authMiddleware.verificarLogin,
    authMiddleware.soloAdminClub,
    jugadorController.formEditarJugador
);

// ===============================
// GUARDAR EDICIÓN ✅
// ===============================
router.post(
    '/jugadores/editar/:id',
    authMiddleware.verificarLogin,
    authMiddleware.soloAdminClub,
    jugadorController.editarJugador
);

module.exports = router;