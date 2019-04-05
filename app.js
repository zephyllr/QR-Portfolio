const express = require('express');
const app = express();
const port = 3000;

// setup db
require('./db');
const mongoose = require('mongoose');
const sanitize = require('mongo-sanitize');
const Customer = mongoose.model('Customer');
const Order = mongoose.model('Order');
const Item = mongoose.model('Item');

// middleware
const path = require('path');
const publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));
app.set('view engine', 'hbs');
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send("Hello world");
});

app.listen(port, () => console.log(`App listening on port ${port}!`));