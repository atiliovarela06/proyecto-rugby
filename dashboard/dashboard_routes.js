const express = require('express');
const router = express.Router();

const dashboardController = require('./dashboard_controller');
const authMiddleware = require('../auth/auth_middleware');

// ADMIN SISTEMA
router.get('/dashboard/admin',
    authMiddleware.verificarLogin,
    authMiddleware.soloAdminSistema,
    dashboardController.adminDashboard
);

// ADMIN CLUB
router.get('/dashboard/club',
    authMiddleware.verificarLogin,
    authMiddleware.soloAdminClub,
    dashboardController.clubDashboard
);

// VIEWER
router.get('/dashboard/viewer',
    authMiddleware.verificarLogin,
    authMiddleware.soloViewer,
    dashboardController.viewerDashboard
);

module.exports = router;
