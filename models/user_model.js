const db = require('../config/db');
const bcrypt = require('bcryptjs');

const User = {

    // Buscar usuario por email (login)
    findByEmail: async (email) => {
        const [rows] = await db.promise().query(
            'SELECT * FROM usuarios WHERE email = ? LIMIT 1',
            [email]
        );
        return rows[0];
    },

    // Crear usuario
    create: async (user) => {
        const passwordHash = await bcrypt.hash(user.password, 10);

        const [result] = await db.promise().query(
            `INSERT INTO usuarios 
            (nombre, email, password_hash, rol_id, club_id, activo) 
            VALUES (?, ?, ?, ?, ?, ?)`,
            [
                user.nombre,
                user.email,
                passwordHash,
                user.rol_id,
                user.club_id || null,
                1
            ]
        );

        return result.insertId;
    },

    // Buscar usuario por ID (sesión)
    findById: async (id) => {
        const [rows] = await db.promise().query(
            `SELECT id, nombre, email, rol_id, club_id 
             FROM usuarios 
             WHERE id = ? AND activo = 1`,
            [id]
        );
        return rows[0];
    },

    // Listar todos (admin sistema)
    getAll: async () => {
        const [rows] = await db.promise().query(
            'SELECT id, nombre, email, rol_id, club_id, activo FROM usuarios'
        );
        return rows;
    }

};

module.exports = User;

