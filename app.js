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

// route handling

// signin-signup page
app.get('/', (req, res) => {
    res.render('home');
});

// register and/or login
app.post('/signin', (req, res) => {
    // sanitize post req attributes
    const username = sanitize(req.body.username);
    const password = sanitize(req.body.password);
    console.log(password);
    User.findOne({ username }, (err, uname) => {
        // check if username exists
        if (!uname) { res.render('home', { signInErr: 'Username not found!' }); }
        else {
            User.findOne({username, password }, (err, user) => {
                // check if password matches
                if(!user) { res.render('home', { signInErr: 'Incorrect password!' }); }
                else { res.redirect('portfolio'); }
            });
        }
    });
});

app.post('/signup', (req, res) => {
    // sanitize post req attributes
    const username = sanitize(req.body.username);
    const password = sanitize(req.body.password);

    User.findOne({ username }, (err, user) => {
        // check if username exists
        if (user) { res.render('home', { signUpErr: 'Username taken!' }); }
        else {
            new User({ username, password }).save((err) => {
                res.redirect('portfolio');
            });
        }
    });
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