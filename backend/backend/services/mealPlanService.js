const RecipeModel = require('../models/recipeModel.js');
const MealPlanModel = require('../models/mealPlanModel.js');
const authUtil = require('../auth/authUtil');

const getMealPlanById = async function(id) {
    return await MealPlanModel.findById(id);
}

const getMealPlansByUserId = async function(userId) {
    return await MealPlanModel.find({owner: userId});
}

const createMealPlan = async function(req, res) {
    let ownerId;
    await authUtil.findUserByAuthToken(req, (err, user) => {
        ownerId = user._id;
    });

    const newMealPlan = new MealPlanModel({
        owner: ownerId,
        recipes: req.body.recipes,
        date: req.body.date
    });

    newMealPlan.save()
    .then((plan) => {
        const location = '/api/mealPlans/' + plan._id;
        res.status(201);
        res.location(location);
        res.json(plan);
    })
    .catch((error) => {
        console.error(error);
        res.status(400).json({message: error.message});
    });
}
module.exports = {getMealPlanById, createMealPlan, getMealPlansByUserId};