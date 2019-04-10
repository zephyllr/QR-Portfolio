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

// is the environment variable, NODE_ENV, set to PRODUCTION? 
let dbconf;
if (process.env.NODE_ENV === 'PRODUCTION') {
 // if we're in PRODUCTION mode, then read the configration from config.json
 // use blocking file io to do this...
 const fs = require('fs');
 const path = require('path');
 const fn = path.join(__dirname, 'config.json');
 const data = fs.readFileSync(fn);

 // our configuration file will be in json, so parse it and set the
 // connection string appropriately!
 const conf = JSON.parse(data);
 dbconf = conf.dbconf;
} else {
 // if we're not in PRODUCTION mode, then use
 dbconf = 'mongodb://localhost/qrPortfolio';
}

mongoose.connect(dbconf, { useNewUrlParser: true });
