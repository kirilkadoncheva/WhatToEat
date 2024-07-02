const express = require('express');
const router = express.Router();
const recipeService = require('../services/recipesService.js');
const RecipeModel = require('../models/recipeModel.js');
const authUtil = require('../auth/authUtil');
const ReviewModel = require('../models/reviewModel.js');

router.post('/', async (req, res) => {
    let creatorId;
    let creatorName;
    await authUtil.findUserByAuthToken(req, (err, user) => {
        creatorId = user._id;
        creatorName = user.firstName.concat(" ", user.lastName);
    });

    const newRecipe = new RecipeModel({
        title: req.body.title,
        description: req.body.description,
        cookingTime: req.body.cookingTime,
        numberOfServings: req.body.numberOfServings,
        cookingAlgorithm: req.body.cookingAlgorithm,
        image: req.body.image,
        ingredients: req.body.ingredients,
        creator: creatorId,
        creatorName: creatorName
    });

    newRecipe.save()
    .then((recipe) => {
        const location = '/api/recipes/' + recipe._id;
        res.status(201);
        res.location(location);
        res.json(recipe);
    })
    .catch((error) => {
        console.error(error);
        res.status(400).json({message: error.message});
    });
});

router.get('/', async (req, res) => {
    if (res.writableFinished) {
        return;
    }
    try {
        let recipes = await RecipeModel.find();
        res.status(200).json(recipes);
        res.end();
    } catch (error) {
        console.error(error);
        console.log(error.message);
        res.status(500).json({message: error.message});
        res.end();
    }
});

router.get('/:id', async (req, res) => {
    try {
        let recipe = await recipeService.getRecipeById(req.params.id);
        if (recipe === null || recipe === undefined) {
            authUtil.sendForbidden(res);
        } else {
            res.status(200).json(recipe);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message});
    }
});

router.put('/:id', async (req, res) => {
    if (res.writableFinished) {
        return;
    }

    try {
        let recipe = await RecipeModel.findById(req.params.id);
        const updateInfo = {
            title: req.body.title || recipe.title,
            description: req.body.description || recipe.description,
            cookingTime: req.body.cookingTime || recipe.cookingTime,
            numberOfServings: req.body.numberOfServings || recipe.numberOfServings,
            cookingAlgorithm: req.body.cookingAlgorithm || recipe.cookingAlgorithm,
            image: req.body.image || recipe.image
        };
    
        await RecipeModel.updateOne({_id: req.params.id}, updateInfo);
        recipe = await RecipeModel.findById(req.params.id);
        res.status(200).json(recipe);
    } catch(error) {
        console.error(error);
        res.status(500).json({message: error.message});
        res.end();
    }
});

router.delete('/:id', async (req, res) => {
    if (res.writableFinished) {
        return;
    }
    try {
        await RecipeModel.findByIdAndDelete(req.params.id);
        res.status(204);
        res.end();
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message});
        res.end();
    }
});

router.get('/:id/reviews', async (req, res) => {
    if (res.writableFinished) {
        return;
    }
    try {
        let reviews = await ReviewModel.find({recipe: req.params.id}).exec();
        if (reviews === null || reviews === undefined) {
            authUtil.sendForbidden(res);
        } else {
            res.status(200).json(reviews);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message});
    }
});

router.get('/:id/reviews/:reviewId', async (req, res) => {
    if (res.writableFinished) {
        return;
    }
    try {
        let review = await ReviewModel.findOne({_id: req.params.reviewId, recipe: req.params.id}).exec();

        if (review === null || review === undefined) {
            authUtil.sendForbidden(res);
        } else {
            res.status(200).json(review);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message});
    }
});

router.delete('/:id/reviews/:reviewId', async (req, res) => {
    console.log("delete");
    if (res.writableFinished) {
        return;
    }
    try {
        console.log(req.params.reviewId);
        await ReviewModel.findByIdAndDelete(req.params.reviewId);
        res.status(204);
        res.end();
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message});
    }
});

router.post('/:id/reviews', async (req, res) => {
    let reviewerId;
    let reviewerName;
    await authUtil.findUserByAuthToken(req, (err, user) => {
        reviewerId = user._id;
        reviewerName = user.firstName.concat(" ", user.lastName);
    })
    if (res.writableFinished) {
        return;
    }
    try {
        let recipe = await RecipeModel.findById(req.params.id);
        let newReview = new ReviewModel({
            reviewer: reviewerId,
            reviewerName: reviewerName,
            recipe: recipe._id,
            rating: req.body.rating,
            comment: req.body.comment
        });

        console.log(newReview);
        newReview.save()
        .then((review) => {
            const location = '/api/recipes/' + recipe._id + "/reviews/" + review._id;
            res.status(201);
            res.location(location);
            res.json(review);
        })
        .catch((error) => {
            console.error(error);
            res.status(400).json({message: error.message});
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message});
        res.end();
    }
});

module.exports = router;