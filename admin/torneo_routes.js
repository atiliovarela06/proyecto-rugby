const express = require('express');
const router = express.Router();

const torneoController = require('./torneo_controller');
const authMiddleware = require('../auth/auth_middleware');


// =========================
// 🔥 LISTAR TORNEOS
// =========================
router.get(
    '/torneos',
    authMiddleware.verificarLogin,
    torneoController.listarTorneos
);


// =========================
// 🔥 FORM NUEVO TORNEO  (⚠️ ANTES DE :torneo_id)
// =========================
router.get(
    '/torneos/nuevo',
    authMiddleware.verificarLogin,
    authMiddleware.soloAdminSistema,
    torneoController.formNuevoTorneo
);


// =========================
// 🔥 CREAR TORNEO
// =========================
router.post(
    '/torneos/nuevo',
    authMiddleware.verificarLogin,
    authMiddleware.soloAdminSistema,
    torneoController.crearTorneo
);


// =========================
// 🔥 INSCRIBIR EQUIPOS
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
// 🔥 VER FIXTURE
// =========================
router.get(
    '/torneos/:torneo_id/fixture',
    authMiddleware.verificarLogin,
    torneoController.verFixture
);


// =========================
// 🔥 GENERAR FIXTURE
// =========================
router.post(
    '/torneos/:torneo_id/generar-fixture',
    authMiddleware.verificarLogin,
    authMiddleware.soloAdminSistema,
    torneoController.generarFixture
);


// =========================
// 🔥 VER TORNEO (⚠️ SIEMPRE AL FINAL)
// =========================
router.get(
    '/torneos/:torneo_id',
    authMiddleware.verificarLogin,
    torneoController.verTorneo
);

module.exports = router;