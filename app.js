const express = require('express');
const app = express();
const port = 8000;

// setup db
require('./db');
const mongoose = require('mongoose');
const sanitize = require('mongo-sanitize');
const Card = mongoose.model('Card');
const User = mongoose.model('User');

// middleware
const path = require('path');
const publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));
app.set('view engine', 'hbs');
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.redirect('/login');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/portfolio', (req, res) => {
    res.render('portfolio');
});

app.get('/create', (req, res) => {
    res.render('create');
});

app.get('/upload', (req, res) => {
    res.render('upload');
});


app.listen(port, () => console.log(`App listening on port ${port}!`));