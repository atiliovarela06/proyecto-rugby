
const mysql = require('mysql2');
const dotenv = require('dotenv');

// Cargar variables de entorno
dotenv.config();

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
