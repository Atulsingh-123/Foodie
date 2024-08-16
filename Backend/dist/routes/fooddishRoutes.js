"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const foodDishController_1 = require("../controllers/foodDishController");
const router = (0, express_1.Router)();
// Route for creating a new food dish
router.post('/', foodDishController_1.createFoodDish);
// Route for getting all food dishes
router.get('/', foodDishController_1.getFoodDishes);
exports.default = router;
