"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrder = void 0;
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Process the order creation logic
        const { item, quantity } = req.body;
        // You would typically interact with your database here
        res.status(201).json({ message: 'Order created', item, quantity });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
exports.createOrder = createOrder;
