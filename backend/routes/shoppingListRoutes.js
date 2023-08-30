const express = require('express');
const router = express.Router();
const mongodb = require('mongodb');
const util = require('util');
const indicative = require('indicative');


router.post('/', (req, res) => {
    res.send('Create shoppingList');
});

router.get('/', (req, res) => {
    res.send('Get all shoppingLists');
});


router.get('/:id', (req, res) => {
    res.send('Get shoppingList by id')
});

router.put('/:id', (req, res) => {
    res.send('Update shoppingList by id')
});

router.delete('/:id', (req, res) => {
    res.send('Delete recipe by id')
});







module.exports = router;