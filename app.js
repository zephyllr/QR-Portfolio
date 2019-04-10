const express = require('express');
const session = require('express-session');
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

// setup sessions
const sessionOptions = {
    secret: 'secret key',
    saveUninitialized: false,
    resave: false
};
app.use(session(sessionOptions));

// setup locals
app.use(function (req, res, next) {
    res.locals.user = req.session.user || null;
    next();
});

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
    User.findOne({ username }, (err, uname) => {
        // check if username exists
        if (!uname) { res.render('home', { signInErr: 'Username not found!' }); }
        else {
            User.findOne({ username, password }, (err, user) => {
                // check if password matches
                if (!user) { res.render('home', { signInErr: 'Incorrect password!' }); }
                else {
                    req.session.user = user;
                    req.session.save();
                    res.redirect('portfolio');
                }
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
                req.session.user = user;
                req.session.save();
                res.redirect('portfolio');
            });
        }
    });
});

app.get('/portfolio', (req, res) => {
    if (!req.session.user) { res.redirect('/'); }
    res.render('portfolio');
});

app.get('/create', (req, res) => {
    if (!req.session.user) { res.redirect('/'); }
    res.render('create');
});

app.post('/create', (req, res) => {
    // sanitize post req attributes
    const username = req.session.user.username;
    const cardName = sanitize(req.body.cardName);
    const cardContent = sanitize(req.body.cardContent);
    const size = 400;
    const qrCode = `http://api.qrserver.com/v1/create-qr-code/?data=${cardContent}&size=${size}x${size}`

    const card = new Card({ cardName, qrCode, cardContent });
    card.save();

    User.findOneAndUpdate({ username }, { $push: { cards: card } }, () => {
        res.redirect('/portfolio');
    });
});

app.get('/upload', (req, res) => {
    if (!req.session.user) { res.redirect('/'); }
    res.render('upload');
});

app.post('/signout', (req, res) => {
    req.session.user = null;
    res.redirect('/');
});

app.listen(port, () => console.log(`App listening on port ${port}!`));