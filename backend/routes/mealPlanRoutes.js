const express = require('express');
const router = express.Router();
const RecipeModel = require('../models/recipeModel.js');
const authUtil = require('../auth/authUtil');
const MealPlanModel = require('../models/mealPlanModel.js');
const mealPlanService = require('../services/mealPlanService.js');

router.post('/', async (req, res) => {
    if (res.writableFinished) {
        return;
    }
    await mealPlanService.createMealPlan(req, res);
});

router.get('/', async (req, res) => {
    if (res.writableFinished) {
        return;
    }
    let ownerId;
    await authUtil.findUserByAuthToken(req, (err, user) => {
        ownerId = user._id;
    });
    
    try {
        let mealPlans = await mealPlanService.getMealPlansByUserId(ownerId);
        res.status(200).json({data: mealPlans});
        res.end();
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message});
        res.end();
    }
});


router.get('/:id', async (req, res) => {
    if (res.writableFinished) {
        return;
    }

    try {
        let mealPlan = await mealPlanService.getMealPlanById(req.params.id);
        res.status(200).json(mealPlan);
        res.end();
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message});
        res.end();
    }
});

router.put('/:id', async (req, res) => {
    if (res.writableFinished) {
        return;
    } 

    try {
        let mealPlan = await mealPlanService.getMealPlanById(req.params.id);
        const updateInfo = {
            owner: mealPlan.owner,
            recipes: req.body.recipes || mealPlan.recipes,
            date: req.body.date || mealPlan.date
        };
        await MealPlanModel.updateOne({_id: req.params.id}, updateInfo);
        mealPlan = await mealPlanService.getMealPlanById(req.params.id);
        res.status(200).json(mealPlan);
    } catch (error) {
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
        await MealPlanModel.findByIdAndDelete(req.params.id);
        res.status(204);
        res.end();
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message});
        res.end();
    }
});








module.exports = router;