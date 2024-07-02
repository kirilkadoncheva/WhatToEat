const express = require('express');
const router = express.Router();
const UserModel = require('../models/userModel.js');
const authUtil = require('../auth/authUtil');
const {JWT_HEADER_NAME} = require('../constants.js');

router.post('/', async (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.status(400).json({message: 'Username and password must be provided.'});
    } else {
        try {
            let user = await UserModel.findOne({email: req.body.email});
            if (user === null || user === undefined) {
                authUtil.sendForbidden(res);
                res.end();
            } else {
                authUtil.comparePassword(req.body.password, user.password, async (err, isMatch) => {
                    console.log(isMatch);
                    if (err || !isMatch) {
                        authUtil.sendForbidden(res);
                        res.end(); 
                    } else {
                        let jwt = user.token;
                        if (!jwt || jwt === '') {
                            jwt = authUtil.addUserJWTToken(res, user._id, user.email, user.role);
                            await UserModel.updateOne({_id: user._id}, {token: jwt});
                            user.token = jwt;
                        }
                        res.header(JWT_HEADER_NAME, jwt);
                        res.status(200);
                        res.json(user);
                        res.end();
                    }
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({message: error.message});
            res.end();
        }
    }
});

module.exports = router;