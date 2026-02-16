const db = require('../config/db');

const Division = {

    getAll: async () => {
        const [rows] = await db.promise().query(
            "SELECT * FROM divisiones ORDER BY nombre"
        );
        return rows;
    },

    getById: async (id) => {
        const [rows] = await db.promise().query(
            "SELECT * FROM divisiones WHERE id = ?",
            [id]
        );
        return rows[0];
    }

};

module.exports = Division;