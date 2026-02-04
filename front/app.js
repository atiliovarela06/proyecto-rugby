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

const app = express();

// 1. Body parser ANTES de rutas 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ✅ 2. Sesión 
app.use(session({
    secret: 'clave_secreta_super_segura',
    resave: false,
    saveUninitialized: false
}));

// 3. Archivos estáticos 
app.use(express.static(path.join(__dirname, 'public')));

// 4. Motor de vistas 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 5. Rutas 
app.use(authRoutes);
app.use(dashboardRoutes);
app.use(adminRoutes);
app.use(clubRoutes);

// Home 
app.get('/', (req, res) => {
    res.render('index', { titulo: "pagina de inicio" });
});

// Servidor 
app.listen(3000, () => {
    console.log('Servidor disponible en http://localhost:3000/login');
});
