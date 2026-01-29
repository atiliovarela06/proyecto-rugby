const db = require('../config/db');

exports.listarClubes = (req, res) => {

    db.query("SELECT * FROM clubes", (err, resultados) => {

        if (err) {
            console.log(err);
            return res.send("Error cargando clubes");
        }

        res.render("clubes", {
            user: req.session.user,
            clubes: resultados
        });

    });

};

    exports.formNuevoClub = (req, res) => {
    res.render('club_nuevo', {
        user: req.session.user
    });
};
//funcion crear club
const Club = require('../models/club_model');

exports.crearClub = async (req, res) => {
    const { nombre } = req.body;

    await Club.create(nombre);

    res.redirect('/admin/clubes');
};


