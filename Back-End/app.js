require('dotenv').config()
const express = require('express');
const publicationsRoutes = require('./routes/publications');
const userRoutes =require('./routes/user');
const replyRoutes =require('./routes/reply');
const likeRoutes =require('./routes/like');

const app =express();

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