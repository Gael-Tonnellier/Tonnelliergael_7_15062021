require('dotenv').config()
const express = require('express');
const mysql= require('mysql2');

//const path =require('path');
const publicationsRoutes = require('./routes/publications');
const userRoutes =require('./routes/user');
const replyRoutes =require('./routes/reply');
const likeRoutes =require('./routes/like');

const app =express();

// METHODE DE CONNECTION A LA DB
const myDatabase = mysql.createConnection({
    host: "databases.000webhost.com",
    user: "id17258250_gael",
    password: "SC?Kv(42!H_Vw*h&",
    database:"id17258250_mysqldb"
});

//HEADER POUR PERMETTRE ECHANGE ENTRE SERVEURS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json({limit:'50mb'}));
//app.use(express.urlencoded({ extended: true}));

app.use('/api/publish',publicationsRoutes);
app.use('/api/user',userRoutes);
app.use('/api/reply',replyRoutes);
app.use('/api/like',likeRoutes);


module.exports = app;