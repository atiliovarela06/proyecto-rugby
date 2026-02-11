const db = require('../config/db');
const bcrypt = require('bcryptjs');

// ✅ MAPEO DE ROLES
const ROLES = {
    admin_sistema: 1,
    admin_club: 2,
    viewer: 3
};

const User = {

    // Buscar usuario por email (login)
    findByEmail: async (email) => {
        email = email.toLowerCase();
        const [rows] = await db.promise().query(
            'SELECT * FROM usuarios WHERE email = ? LIMIT 1',
            [email]
        );
        return rows[0];
    },

    // Crear usuario
    create: async (user) => {

        let rol_id = user.rol_id;

        if (!rol_id && user.rol) {
            rol_id = ROLES[user.rol];
        }

        if (!rol_id) {
            throw new Error('Rol inválido');
        }

        const passwordHash = await bcrypt.hash(user.password, 10);

        const [result] = await db.promise().query(
            `INSERT INTO usuarios 
            (nombre, email, password_hash, rol_id, club_id, activo) 
            VALUES (?, ?, ?, ?, ?, ?)`,
            [
                user.nombre,
                user.email,
                passwordHash,
                rol_id,
                user.club_id || null,
                1
            ]
        );

        return result.insertId;
    },

    // ✅ NUEVA FUNCIÓN — actualizar rol
    updateRol: async (id, rol_id, club_id) => {

        await db.promise().query(
            `UPDATE usuarios 
             SET rol_id = ?, club_id = ?
             WHERE id = ?`,
            [
                rol_id,
                club_id || null,
                id
            ]
        );
    },

    findById: async (id) => {
        const [rows] = await db.promise().query(
            `SELECT id, nombre, email, rol_id, club_id 
             FROM usuarios 
             WHERE id = ? AND activo = 1`,
            [id]
        );
        return rows[0];
    },

    getAll: async () => {
        const [rows] = await db.promise().query(
            'SELECT id, nombre, email, rol_id, club_id, activo FROM usuarios'
        );
        return rows;
    }
};

module.exports = User;