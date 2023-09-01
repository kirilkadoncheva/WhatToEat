const express = require('express');
const router = express.Router();
const UserModel = require('../models/userModel.js');
const authUtil = require('../auth/authUtil');

router.post('/', async (req, res) => {
    authUtil.findUserByAuthToken(req, async (err, user) => {
        if (err) {
            res.status(500).json({message: err.message});
            res.end();
        } else {
            if (user) {
                await UserModel.updateOne({_id: user._id}, {token: null});
                res.status(200);
                res.end();
            }
        }
    })
});

module.exports = router;