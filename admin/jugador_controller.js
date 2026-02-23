const Jugador = require('../models/jugador_model');
const Categoria = require('../models/categoria_model');

const listarJugadores = async (req, res) => {
    try {
        const club_id = req.session.user.club_id;

        const jugadores = await Jugador.getByClub(club_id);

        res.render('jugadores', {
            jugadores,
            user: req.session.user
        });
    } catch (error) {
        console.error(error);
        res.send('Error al listar jugadores');
    }
};

const formNuevoJugador = async (req, res) => {
    try {
        const categorias = await Categoria.getAll();

        res.render('jugador_nuevo', {
            categorias,
            user: req.session.user
        });
    } catch (error) {
        console.error(error);
        res.send('Error al cargar formulario');
    }
};

const crearJugador = async (req, res) => {
    try {
        const {
            dni,
            nombre,
            apellido,
            fecha_nacimiento,
            posicion,
            categoria_id,
            activo
        } = req.body;

        const club_id = req.session.user.club_id;

        await Jugador.create({
            dni,
            nombre,
            apellido,
            fecha_nacimiento,
            posicion,
            categoria_id,
            club_id,
            activo: activo ? 1 : 0
        });

        res.redirect('/admin/jugadores');
    } catch (error) {
        console.error('ERROR MYSQL', error.sqlMessage || error);
        res.send(error.sqlMessage||'Error al crear jugador');
    }
};

const formEditarJugador = async (req, res) => {
    try {
        const id = req.params.id;
        const club_id = req.session.user.club_id;

        const jugador = await Jugador.getById(id, club_id);
        const categorias = await Categoria.getAll();

        if (!jugador) {
            return res.send('Jugador no encontrado');
        }

        res.render('jugador_editar', {
            jugador,
            categorias,
            user: req.session.user
        });
    } catch (error) {
        console.error(error);
        res.send('Error al cargar jugador');
    }
};

const editarJugador = async (req, res) => {
    try {
        const id = req.params.id;
        const club_id = req.session.user.club_id;

        const {
            dni,
            nombre,
            apellido,
            fecha_nacimiento,
            posicion,
            categoria_id,
            activo
        } = req.body;

        await Jugador.update(id, club_id, {
            dni,
            nombre,
            apellido,
            fecha_nacimiento,
            posicion,
            categoria_id,
            activo: activo ? 1 : 0
        });

        res.redirect('/admin/jugadores');
    } catch (error) {
        console.error(error);
        res.send('Error al editar jugador');
    }
};

module.exports = {
    listarJugadores,
    formNuevoJugador,
    crearJugador,
    formEditarJugador,
    editarJugador
};

 