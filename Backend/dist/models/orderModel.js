"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Define the order schema
const orderSchema = new mongoose_1.Schema({
    dishName: { type: String, required: true },
    quantity: { type: Number, required: true },
    tableNumber: { type: Number, required: true },
    status: { type: String, default: 'Pending' },
}, { timestamps: true });
// Create and export the model
const Order = (0, mongoose_1.model)('Order', orderSchema);
exports.default = Order;
