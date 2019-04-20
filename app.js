const express = require('express');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const cors = require('cors')
const bodyParser = require('body-parser');
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
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// cors
app.use(cors())
cors({ credentials: true, origin: true })

// setup sessions
const sessionOptions = {
    secret: 'secret key',
    saveUninitialized: false,
    resave: false
};
app.use(session(sessionOptions));

// setup locals
// app.use(function (req, res, next) {
//     // refetch user data
//     // if (!req.session.hasOwnProperty('user')) {
//     //     req.session.user = null;
//     // }
//     const user = req.session.user;
//     res.locals.user = null;
//     if (user && user.hasOwnProperty("username")){
//         res.locals.user = user.username;
//     }
//     next();
// });

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
            new User({ username, password }).save((err, user) => {
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

app.get('/loadPortfolio', (req, res) => {
    const user = req.session.user;
    if (!user) { res.redirect('/'); }
    const username = user.username;

    User.findOne({ username }, (err, user) => {
        if (err) { return res.status(404).json({ error: 'Error occurred: database error.' }); }
        res.json(user);
    });
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

    User.findOneAndUpdate({ username }, { $push: { cards: card } }, (err, user) => {
        res.redirect('/portfolio');
    });
});

app.post('/search', (req, res) => {
    const user = req.session.user;
    const username = user.username;
    const cardName = req.body.cardName;

    User.findOne({ username }, (err, user) => {
        let allCards = user.cards;
        allCards = allCards.filter(card => card.cardName.toLowerCase().includes(cardName));
        allCards = allCards.map(card => card.cardName);
        if (err) { return res.status(404).json({ error: 'Error occurred: database error.' }); }
        res.json(allCards);
    });
});

app.get('/upload', (req, res) => {
    if (!req.session.user) { res.redirect('/'); }
    res.render('upload');
});

app.post('/upload', (req, res) => {
    // sanitize post req attributes
    const cardName = sanitize(req.body.cardName);
    // const file = req.body.file;
    // const qrCode = `http(s)://api.qrserver.com/v1/read-qr-code/?fileurl=${file}`;
    // console.log(qrCode);

    if (Object.keys(req.files).length == 0) {
        return res.status(400).send('No files were uploaded.');
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    const file = req.files.file;
    // const qrCode = `http(s)://api.qrserver.com/v1/read-qr-code/?file=${file.data}`;
    // console.log(qrCode);
    res.redirect('/portfolio');

});

app.post('/signout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

app.listen(process.env.PORT || port, () => console.log(`App listening on port ${port}!`));