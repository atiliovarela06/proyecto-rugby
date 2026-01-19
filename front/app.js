
require('dotenv').config();
require('./config/db');

const session = require('express-session');


const express = require('express');
const path = require('path');


const app = express(); 

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: 'clave_secreta_super_segura',
    resave: false,
    saveUninitialized: false
}));


// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Motor de vistas (si usás EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/',(req,res)=>{
res.render('index',{ titulo:"pagina de inicio" })
});

app.listen(3000, () => {
    console.log('Servidor en http://localhost:3000');
});