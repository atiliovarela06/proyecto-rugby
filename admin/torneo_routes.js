const express = require('express');
const router = express.Router();

const torneoController = require('./torneo_controller');
const authMiddleware = require('../auth/auth_middleware');

// =========================
// LISTAR TORNEOS (todos logueados)
// =========================
router.get(
    '/torneos',
    authMiddleware.verificarLogin,
    torneoController.listarTorneos
);

// =========================
// NUEVO TORNEO (solo admin sistema)
// =========================
router.get(
    '/torneos/nuevo',
    authMiddleware.verificarLogin,
    authMiddleware.soloAdminSistema,
    torneoController.formNuevoTorneo
);

router.post(
    '/torneos/nuevo',
    authMiddleware.verificarLogin,
    authMiddleware.soloAdminSistema,
    torneoController.crearTorneo
);

// =========================
// INSCRIBIR EQUIPOS (solo admin)
// =========================
router.get(
    '/torneos/:torneo_id/inscribir',
    authMiddleware.verificarLogin,
    authMiddleware.soloAdminSistema,
    torneoController.formInscribirEquipos
);

router.post(
    '/torneos/:torneo_id/inscribir',
    authMiddleware.verificarLogin,
    authMiddleware.soloAdminSistema,
    torneoController.guardarInscripcion
);

// =========================
// VER FIXTURE (todos)
// =========================
router.get(
    '/torneos/:torneo_id/fixture',
    authMiddleware.verificarLogin,
    torneoController.verFixture
);

// =========================
// RESULTADO PARTIDO (solo admin sistema)
// =========================
router.get(
    '/partidos/:partido_id/resultado',
    authMiddleware.verificarLogin,
    authMiddleware.soloAdminSistema,
    torneoController.formResultado
);

router.post(
    '/partidos/:partido_id/resultado',
    authMiddleware.verificarLogin,
    authMiddleware.soloAdminSistema,
    torneoController.guardarResultado
);

// =========================
// GENERAR FIXTURE (solo admin)
// =========================
router.post(
    '/torneos/:torneo_id/generar-fixture',
    authMiddleware.verificarLogin,
    authMiddleware.soloAdminSistema,
    torneoController.generarFixture
);

// =========================
// VER TORNEO (todos)
// =========================
router.get(
    '/torneos/:torneo_id',
    authMiddleware.verificarLogin,
    torneoController.verTorneo
);

module.exports = router;