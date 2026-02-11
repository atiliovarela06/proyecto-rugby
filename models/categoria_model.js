const db = require('../config/db');

const Categoria = {

    async getAll() {
        const [rows] = await db.promise().query(
            'SELECT id, nombre FROM categorias_jugadores'
        );
        return rows;
    }

};

module.exports = Categoria;