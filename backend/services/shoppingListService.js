const ShoppingListModel = require('../models/shoppingListModel.js');
const MealPlanModel = require('../models/mealPlanModel.js');
const authUtil = require('../auth/authUtil');

const getShoppingListById = async function(id) {
    return await ShoppingListModel.findById(id);
}

const createShoppingList = async function(req, res) {
    let ownerId;
    await authUtil.findUserByAuthToken(req, (err, user) => {
        ownerId = user._id;
    });

    if (req.body.startDate === null || req.body.startDate === undefined ||
        req.body.endDate === null || req.body.endDate === undefined) {
            res.status(400).json({message: 'Start date and end date must be provided.'});
            return;
    }
    let date1 = new Date(req.body.startDate).getTime();
    let date2 = new Date(req.body.endDate).getTime();
    if (date1 > date2) {
        res.status(400).json({message: 'Start date must be <= end date.'});
        return;
    }
    const newShoppingList = new ShoppingListModel({
        owner: ownerId,
        mealPlans: req.body.mealPlans,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        completed: false
    });


    newShoppingList.save()
    .then((list) => {
        const location = '/api/shoppingLists/' + list._id;
        res.status(201);
        res.location(location);
        res.json(list);
    })
    .catch((error) => {
        console.error(error);
        res.status(400).json({message: error.message});
    });

}

const getShoppingListsByUserId = async function(userId) {
    return await ShoppingListModel.find({owner: userId});
}

module.exports = {getShoppingListById, createShoppingList, getShoppingListsByUserId};