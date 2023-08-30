const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
    id: {type: String, required: false},
    name: String,
    amount: Number,
    unit: {
        type: String,
        enum : ['mL','L', 'mg', 'g', 'kg', 'mm', 'cm', 'm'],
        default: 'mg'
    }
});
const recipeSchema = new mongoose.Schema({
    id: {type: String, required: false},
    title: {type: String, required: true},
    description: {type: String, required: true},
    cookingTime: {type: Number, required: true},
    numberOfServings: {type: Number, required: true},
    cookingAlgorithm: {type: String, required: true},
    image: {type: String, required: true},
    creator: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    ratings: [{type: mongoose.Schema.Types.ObjectId, ref: "Rating"}]
})

const recipeModel = new mongoose.model('Recipe', recipeSchema);
const ingredientModel = new mongoose.model('Ingredent', ingredientSchema);
module.exports = {ingredientModel, recipeModel};