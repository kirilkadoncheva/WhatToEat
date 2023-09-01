const mongoose = require('mongoose');

const shoppingListSchema = new mongoose.Schema({
    id: {type: String, required: false},
    startDate: {type: Date, required: true},
    endDate: {type: Date, required: true},
    completed: {type: Boolean, required: true, default: false},
    mealPlans: [{type: mongoose.Schema.Types.ObjectId, ref: "MealPlan"}],
    owner: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}
})

const shoppingListModel = new mongoose.model('ShoppingList', shoppingListSchema);
module.exports = shoppingListModel;