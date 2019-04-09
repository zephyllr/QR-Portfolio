// db.js

const mongoose = require('mongoose');

const Card = new mongoose.Schema({
    cardname: { type: String, required: true }, 
    qrcode: { type: Buffer, required: true }, 
    text: { type: String }, 
    slug: { type: String },
});

const User = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    cards: [Card],
});

mongoose.model("Card", Card);
mongoose.model("User", User);
