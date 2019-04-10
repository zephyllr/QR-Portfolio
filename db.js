// db.js

const mongoose = require('mongoose');

const Card = new mongoose.Schema({
    cardName: { type: String, required: true }, 
    qrCode: { type: String, required: true }, 
    cardContent: { type: String }, 
});

const User = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    cards: [Card],
});

mongoose.model("Card", Card);
mongoose.model("User", User);

mongoose.connect('mongodb://localhost/qrPortfolio', { useNewUrlParser: true });
