const express = require('express');
const router = express.Router();

const clubController = require('./club_controller');
const authMiddleware = require('../auth/auth_middleware');



  // LISTAR CLUBES (TODOS los usuarios logueados)


router.get(
    '/clubes',
    authMiddleware.verificarLogin,
    clubController.listarClubes
);


   //CREAR CLUB (SOLO ADMIN SISTEMA rol=1)


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



   //EDITAR CLUB (SOLO ADMIN SISTEMA rol=1)


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



  // ELIMINAR CLUB (SOLO ADMIN SISTEMA rol=1)


router.post(
    '/clubes/eliminar/:id',
    authMiddleware.verificarLogin,
    authMiddleware.soloAdminSistema,
    clubController.eliminarClub
);

module.exports = router;

 