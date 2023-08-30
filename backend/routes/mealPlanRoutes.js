const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    res.send('Create mealPlan');
});

router.get('/', (req, res) => {
    res.send('Get all mealPlans');
});


router.get('/:id', (req, res) => {
    res.send('Get mealPlan by id')
});

router.put('/:id', (req, res) => {
    res.send('Update mealPlan by id')
});

router.delete('/:id', (req, res) => {
    res.send('Delete recipe by id')
});








module.exports = router;