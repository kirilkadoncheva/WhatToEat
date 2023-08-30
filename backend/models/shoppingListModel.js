const mongoose = require('mongoose');

const shoppingListSchema = new mongoose.Schema({
    id: {type: String, required: false},
    date: {type: Date, required: true},
    mealPlans: [{type: mongoose.Schema.Types.ObjectId, ref: "MealPlan"}],
    owner: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}
})

const shoppingListModel = new mongoose.model('ShoppingList', shoppingListSchema);
module.exports = shoppingListModel;