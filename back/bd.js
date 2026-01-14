const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Pool de conexiones
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test de conexión
db.getConnection((err, connection) => {
    if (err) {
        console.error('Error conectando a MySQL:', err);
    } else {
        console.log('MySQL conectado correctamente 🚀');
        connection.release();
    }
});

// Ruta principal
app.get('/', (req, res) => {
    res.render('index', { titulo: 'Página de Inicio' });
});

// Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Servidor corriendo en http://localhost:${PORT}');
});

module.exports = db;
