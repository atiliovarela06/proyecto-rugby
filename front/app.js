require('dotenv').config();
require('../config/db');

const express = require('express');
const session = require('express-session');
const path = require('path');

// Rutas
const authRoutes = require('../auth/auth_routes');
const dashboardRoutes = require('../dashboard/dashboard_routes');
const adminRoutes = require('../admin/admin_routes');
const clubRoutes = require('../admin/club_routes');
const jugadorRoutes = require('../admin/jugador_routes');
const userRoutes = require('../admin/user_routes');

const app = express();

// Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sesiones
app.use(session({
    secret: 'clave_secreta_super_segura',
    resave: false,
    saveUninitialized: false
}));

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Rutas
app.use(authRoutes);
app.use(dashboardRoutes);
app.use(adminRoutes);
app.use(userRoutes);

// ✅ SOLO admin club (rol 2)
app.use('/admin/club', clubRoutes);
app.use('/admin/club', jugadorRoutes);

// Home
app.get('/', (req, res) => {
    res.render('index', { titulo: 'pagina de inicio' });
});

// Servidor
app.listen(3000, () => {
    console.log('Servidor disponible en http://localhost:3000/login');
});