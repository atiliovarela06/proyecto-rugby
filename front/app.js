
require('dotenv').config();

const express = require('express');
const path = require('path');
const mysql = require('mysql2');

const app = express(); 

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Motor de vistas (si usás EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



// Crear pool de conexiones
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Verificación de conexión
db.getConnection((err, connection) => {
    if (err) {
        console.error(' Error al conectar con MySQL:', err.message);
    } else {
        console.log('Conectado a MySQL correctamente');
        connection.release();
    }
});

module.exports = db;

app.get('/',(req,res)=>{
res.render('index',{ titulo:"pagina de inicio" })
});

app.listen(3000, () => {
    console.log('Servidor en http://localhost:3000');
});