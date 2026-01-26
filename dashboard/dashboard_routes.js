const express = require('express');
const router = express.Router();
const dashboardController = require('./dashboard_controller');
const authMiddleware = require('../auth/auth_middleware');

// ADMIN
router.get('/dashboard/admin',
    authMiddleware.isAuthenticated,
    authMiddleware.isAdmin,
    dashboardController.adminDashboard
);

// CLUB
router.get('/dashboard/club',
    authMiddleware.isAuthenticated,
    authMiddleware.isClub,
    dashboardController.clubDashboard
);

// VIEWER
router.get('/dashboard/viewer',
    authMiddleware.isAuthenticated,
    authMiddleware.isViewer,
    dashboardController.viewerDashboard
);

module.exports = router;
