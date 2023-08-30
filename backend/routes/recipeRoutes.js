const express = require('express');
const router = express.Router();
const mongodb = require('mongodb');
const util = require('util');
const indicative = require('indicative');

router.post('/', (req, res) => {
    res.send('Create recipe');
});

router.get('/', (req, res) => {
    res.send('Get all recipes');
});


router.get('/:id', (req, res) => {
    res.send('Get recipe by id')
});

router.put('/:id', (req, res) => {
    res.send('Update recipe by id')
});

router.delete('/:id', (req, res) => {
    res.send('Delete recipe by id')
});









module.exports = router;