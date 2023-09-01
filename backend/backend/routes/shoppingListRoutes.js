const express = require('express');
const router = express.Router();
const authUtil = require('../auth/authUtil');
const ShoppingListModel = require('../models/shoppingListModel.js');
const shoppingListService = require('../services/shoppingListService.js');
const RecipeModel = require('../models/recipeModel.js');
const MealPlanModel = require('../models/mealPlanModel.js');


router.post('/', async (req, res) => {
    if (res.writableFinished) {
        return;
    }
    await shoppingListService.createShoppingList(req, res);
});

router.get('/', async(req, res) => {
    if (res.writableFinished) {
        return;
    }

    let ownerId = req.query.ownerId;
    if (ownerId === null || ownerId === undefined) {
        await authUtil.findUserByAuthToken(req, (err, user) => {
            ownerId = user._id;
        });
    }
 
    try {
        let shoppingLists = await shoppingListService.getShoppingListsByUserId(ownerId);
        res.status(200).json({data: shoppingLists});
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
        let list = await shoppingListService.getShoppingListById(req.params.id);
        res.status(200).json(list);
        res.end();
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message});
        res.end();
    }
});

router.get('/:id/ingredients', async (req, res) => {
    if (res.writableFinished) {
        return;
    }

    try {
        let list = await ShoppingListModel.findById(req.params.id);
        let mealPlanIds = list.mealPlans;
        var ingredients = []; 
        let mealPlans = await MealPlanModel.find({
            '_id': { $in: mealPlanIds}
        }); 

        for(let i = 0; i < mealPlans.length; i++) {
            let mealPlan = mealPlans[i];
            let recipes = await RecipeModel.find({
                '_id': { $in: mealPlan.recipes}
            }); 
            for(let k = 0; k < recipes.length; k++) {
                let recipe = recipes[k];
                if (!(recipe.ingredients === null || recipe.ingredients === undefined 
                    || recipe.ingredients.length == 0)) {
                        ingredients.push(recipe.ingredients);
                    }
            }
        }
        console.log(ingredients);
        res.status(200).json(ingredients);
        res.end();
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message});
        res.end();
    }
});

//complete
router.put('/:id', (req, res) => {
    res.send('Update shoppingList by id')
});

router.delete('/:id', async (req, res) => {
    if (res.writableFinished) {
        return;
    }
    try {
        await ShoppingListModel.findByIdAndDelete(req.params.id);
        res.status(204);
        res.end();
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message});
        res.end();
    }
});

module.exports = router;