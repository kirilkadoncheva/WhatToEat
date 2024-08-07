const express = require('express');
const router = express.Router();
const mongodb = require('mongodb');
const util = require('util');
const indicative = require('indicative');
const BCrypt = require('bcryptjs');
const JsonWebToken = require('jsonwebtoken');
const BodyParser = require('body-parser');
const UserModel = require('../models/userModel.js')
const {SECRET_JWT_CODE, JWT_HEADER_NAME} = require('../constants.js');
const AUTH_HEADER_NAME = "Authorization";
const authUtil = require('../auth/authUtil');
const mealPlanService = require('../services/mealPlanService.js');

router.post('/', (req, res) => {
    if (res.writableFinished) {
        return;
    }
    if(!req.body.password) {
        var errorMessage = "Password must be provided.";
        console.error(errorMessage);
        res.status(400).json({message: errorMessage});
    }

    const newUser = new UserModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        avatar: req.body.avatar,
        password: req.body.password,
        role: req.body.role
    });
    newUser.save()
    .then((user) => {
        const location = '/api/users/' + user._id;
        res.status(201);
        res.location(location);
        res.json(user);
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
        let users = await UserModel.find();
        res.status(200).json({data: users});
        res.end();
    } catch (error) {
        console.error(error);
        console.log(error.message);
        res.status(500).json({message: error.message});
        res.end();
    }
});


router.get('/:id', async (req, res) => {
    if (res.writableFinished) {
        return;
    }
    try {
        let user = await UserModel.findById(req.params.id);
        if (user === null || user === undefined) {
            authUtil.sendForbidden(res);
        } else {
            res.status(200).json(user);
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
        let user = await UserModel.findById(req.params.id);
        let newPassword = !(req.body.password === null || req.body.password === undefined);
        let newToken = user.token;
        if (newPassword) {
            newToken = null;
        }
        var updateInfo = {
            firstName: req.body.firstName || user.firstName,
            lastName: req.body.lastName || user.lastName,
            role: user.role,
            avatar: req.body.avatar || user.avatar,
        };
        await UserModel.updateOne({_id: req.params.id}, updateInfo);
        user = await UserModel.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message});
    }
});

router.delete('/:id', async (req, res) => {
    if (res.writableFinished) {
        return;
    }
    try {
        console.log('delete');
        await UserModel.findByIdAndDelete(req.params.id);
        res.status(204);
        res.end();
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message});
        res.emd();
    }
});

router.post('/:id/mealPlans', async (req, res) => {
    if (res.writableFinished) {
        return;
    }
    await mealPlanService.createMealPlan(req, res);
});

router.get('/:id/mealPlans', async (req, res) => {
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

module.exports = router;
