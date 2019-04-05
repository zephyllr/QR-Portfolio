// db.js

const mongoose = require('mongoose');

const Item = new mongoose.Schema({
    quantity: { type: Number, required: true },
    itemName: { type: String, required: true },
    price: { type: Number, required: true },
});

const Order = new mongoose.Schema({
    invoiceID: { type: Number, required: true }, 
    client: { type: String, required: true },
    items: [Item],
    totalAmt: { type: Number },
    paidOff: { type: Boolean, default: false },
    pickedUp: { type: Boolean, default: false },
    supplier: { type: String },
});

const Customer = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    slug: {type: String},
    orders: [Order]
});

mongoose.model("Item", Item);
mongoose.model("Order", Order);
mongoose.model("Customer", Customer);
