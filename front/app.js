require('dotenv').config();
require('../config/db');

const express = require('express');
const session = require('express-session');
const path = require('path');

const authRoutes = require('../auth/auth_routes');
const dashboardRoutes = require('../dashboard/dashboard_routes');
const adminRoutes = require('../admin/admin_routes');

const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sesión
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

// Home
app.get('/', (req, res) => {
    res.render('index', { titulo: "pagina de inicio" });
});

// Servidor
app.listen(3000, () => {
    console.log('Servidor en http://localhost:3000');
});

