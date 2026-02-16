const db = require('../config/db');

const Division = {

    getAll: async () => {
        const [rows] = await db.promise().query(
            "SELECT * FROM divisiones ORDER BY id"
        );
        return rows;
    }

};

module.exports = Division;