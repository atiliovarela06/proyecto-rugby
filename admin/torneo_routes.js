const express = require('express');
const router = express.Router();

const torneoController = require('./torneo_controller');
const authMiddleware = require('../auth/auth_middleware');

router.get('/torneos', authMiddleware.verificarLogin, torneoController.listarTorneos);

router.get('/torneos/nuevo',
    authMiddleware.verificarLogin,
    authMiddleware.soloAdminSistema,
    torneoController.formNuevoTorneo
);

router.post('/torneos/nuevo',
    authMiddleware.verificarLogin,
    authMiddleware.soloAdminSistema,
    torneoController.crearTorneo
);

router.get('/torneos/:torneo_id/inscribir',
    authMiddleware.verificarLogin,
    authMiddleware.soloAdminSistema,
    torneoController.formInscribirEquipos
);

router.post('/torneos/:torneo_id/inscribir',
    authMiddleware.verificarLogin,
    authMiddleware.soloAdminSistema,
    torneoController.guardarInscripcion
);

router.get('/torneos/:torneo_id/fixture',
    authMiddleware.verificarLogin,
    torneoController.verFixture
);

router.get('/partidos/:partido_id/resultado',
    authMiddleware.verificarLogin,
    authMiddleware.soloAdminSistema,
    torneoController.formResultado
);

router.post('/partidos/:partido_id/resultado',
    authMiddleware.verificarLogin,
    authMiddleware.soloAdminSistema,
    torneoController.guardarResultado
);

/* ✅ NUEVA RUTA CANCELAR */
router.post('/partidos/:partido_id/cancelar',
    authMiddleware.verificarLogin,
    authMiddleware.soloAdminSistema,
    torneoController.cancelarPartido
);

router.post('/torneos/:torneo_id/generar-fixture',
    authMiddleware.verificarLogin,
    authMiddleware.soloAdminSistema,
    torneoController.generarFixture
);

router.get('/torneos/:torneo_id',
    authMiddleware.verificarLogin,
    torneoController.verTorneo
);

module.exports = router;