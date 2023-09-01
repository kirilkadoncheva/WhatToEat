const mongoose = require('mongoose');

const mealPlanSchema = new mongoose.Schema({
    id: {type: String, required: false},
    date: {type: Date, required: true},
    recipes: [{type: mongoose.Schema.Types.ObjectId, ref: "Recipe"}],
    owner: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}
})

const mealPlanModel = new mongoose.model('MealPlan', mealPlanSchema);
module.exports = mealPlanModel;