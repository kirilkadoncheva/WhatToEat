const RecipeModel = require('../models/recipeModel.js');
const ReviewModel = require('../models/reviewModel.js');

const getRecipeById = async function(id) {
    let recipe = await RecipeModel.findById(id);
    return recipe;
}

const getReviewById = async function(id) {
    let recipe = await ReviewModel.findById(id);
    return recipe;
}

const verifyUserIsRecipeOwnerOrAdmin = async function(user, decodedJWT, req, res) {
    let isAdmin = decodedJWT.role === 'administrator';
    if (isAdmin) {
        return;
    }
    let recipe = await getRecipeById(req.params.id);
    console.log(recipe);
    if (recipe === null || recipe === undefined) {
        return;
    }
    if (!recipe.creator.equals(user._id)) {
        res.status(403).send("Forbidden");
        res.end();
    }
}

const verifyUserIsReviewOwnerOrAdmin = async function(user, decodedJWT, req, res) {
    console.log('check');
    let isAdmin = decodedJWT.role === 'administrator';
    if (isAdmin) {
        return;
    }
    let review = await ReviewModel.findOne({_id: req.params.reviewId, recipe: req.params.id, reviewer: user._id}).exec();
    console.log(review);
    if (review === null || review === undefined) {
        res.status(403).send("Forbidden");
        res.end();
    }
}

const verifyUserIsNotRecipeOwner = async function(user, decodedJWT, req, res) {
    let recipe = await RecipeModel.findOne({_id: req.params.id, creator: user._id}).exec();
    console.log(recipe);
    if (!(recipe === null || recipe === undefined)) {
        res.status(403).send("Forbidden");
        res.end();
    }
}

module.exports = {getRecipeById, verifyUserIsRecipeOwnerOrAdmin, verifyUserIsReviewOwnerOrAdmin, verifyUserIsNotRecipeOwner};