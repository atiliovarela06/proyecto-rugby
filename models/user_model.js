const db = require('../config/db');
const bcrypt = require('bcryptjs');

const User = {

    // Buscar usuario por email (para login)
    findByEmail: async (email) => {
        const [rows] = await db.promise().query(
            'SELECT * FROM users WHERE email = ? LIMIT 1',
            [email]
        );
        return rows[0];
    },

    // Crear usuario (alta)
    create: async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);

        const [result] = await db.promise().query(
            `INSERT INTO users (nombre, email, password, role)
             VALUES (?, ?, ?, ?)`,
            [user.nombre, user.email, hashedPassword, user.role]
        );

        return result.insertId;
    },

    // Buscar usuario por ID (para sesión)
    findById: async (id) => {
        const [rows] = await db.promise().query(
            'SELECT id, nombre, email, role FROM users WHERE id = ?',
            [id]
        );
        return rows[0];
    },

    // Listar todos (solo admin sistema)
    getAll: async () => {
        const [rows] = await db.promise().query(
            'SELECT id, nombre, email, role FROM users'
        );
        return rows;
    }

};

module.exports = User;
