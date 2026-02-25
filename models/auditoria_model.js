const db = require('../config/db');

const Auditoria = {

    log: async (usuario_id, accion, modulo) => {

        await db.promise().query(
            `INSERT INTO auditoria (usuario_id, accion, modulo)
             VALUES (?, ?, ?)`,
            [usuario_id, accion, modulo]
        );

    }

};

module.exports = Auditoria;