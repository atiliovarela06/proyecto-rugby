const express = require('express');
const router = express.Router();

const userController = require('./user_controller');
const authMiddleware = require('../auth/auth_middleware');

// REGISTRO VIEWER
router.get('/usuarios/registro', userController.formRegistro);
router.post('/usuarios/registro', userController.crearViewer);

// ADMIN SISTEMA

router.get(
    '/admin/usuarios',
    authMiddleware.verificarLogin,
    authMiddleware.soloAdminSistema,
    userController.listarUsuarios
);

router.get(
    '/admin/usuarios/nuevo',
    authMiddleware.verificarLogin,
    authMiddleware.soloAdminSistema,
    userController.formNuevoAdminClub
);

router.post(
    '/admin/usuarios/nuevo',
    authMiddleware.verificarLogin,
    authMiddleware.soloAdminSistema,
    userController.crearAdminClub
);

// ✅ EDITAR ROL
router.get(
    '/admin/usuarios/rol/:id',
    authMiddleware.verificarLogin,
    authMiddleware.soloAdminSistema,
    userController.formEditarRol
);

router.post(
    '/admin/usuarios/rol/:id',
    authMiddleware.verificarLogin,
    authMiddleware.soloAdminSistema,
    userController.actualizarRol
);

module.exports = router;