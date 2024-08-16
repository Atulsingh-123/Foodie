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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPayment = void 0;
const paymentModel_1 = __importDefault(require("../models/paymentModel"));
const createPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { amount, method, currency } = req.body;
        // Check if required fields are present
        if (!amount || !method || !currency) {
            return res.status(400).json({
                message: 'Missing required fields',
                error: ' amount, method, and currency are required'
            });
        }
        // Create a new payment
        const newPayment = new paymentModel_1.default({
            amount,
            method,
            currency
        });
        const savedPayment = yield newPayment.save();
        res.status(201).json({
            message: 'Payment created successfully',
            data: savedPayment
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error creating payment',
            error: error.message
        });
    }
});
exports.createPayment = createPayment;
