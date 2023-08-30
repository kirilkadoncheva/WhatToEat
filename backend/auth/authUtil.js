const JsonWebToken = require('jsonwebtoken');
const {SECRET_JWT_CODE, JWT_HEADER_NAME} = require('../constants.js');
const BCrypt = require('bcryptjs');
const BodyParser = require('body-parser');
const UserModel = require('../models/userModel.js');

const verifyToken = async (req, res, next, requireAdmin, expectedUserId, checkRole) => {
    const { authorization } = req.headers;
    if (!authorization) {
        sendUnauthorized(res);
        res.end();
    } else {
        const jwt = authorization.split(' ')[1];
        try {
             const decoded = await JsonWebToken.verify(jwt, SECRET_JWT_CODE);
             var isAdmin = decoded.role == 'administrator';
             var roleInBody = req.body.role;
             if (requireAdmin && !isAdmin) {
                sendForbidden(res);
                res.end();
             } else if (expectedUserId && expectedUserId != decoded.id && !isAdmin) {
                sendForbidden(res);
                res.end();
             } else if (checkRole && roleInBody === 'administrator' && !isAdmin) {
                sendForbidden(res);
                res.end();
             } else {
                let user = await UserModel.findOne({_id: decoded.id, token: jwt});
                if (!user) {
                    sendForbidden(res);
                    res.end(); 
                } else {
                    next();
                }
             }
        } catch (error) {
            sendUnauthorized(res);
            res.end();
        }
    }
}

const verifyTokenOnCreateUser = async (req, res, next) => {
    var roleInBody = req.body.role;
    console.log(roleInBody);
    if (roleInBody === 'administrator') {
        console.log(roleInBody);
        const { authorization } = req.headers;
        if (!authorization) {
            sendUnauthorized(res);
            res.end();
        } else {
            const jwt = authorization.split(' ')[1];
            try {
                 const decoded = await JsonWebToken.verify(jwt, SECRET_JWT_CODE);
                 var isAdmin = decoded.role == 'administrator';
                 if (!isAdmin) {
                    sendForbidden(res);
                    res.end();
                 }  else {
                    let user = await UserModel.findOne({_id: decoded.id, token: jwt});
                    if (!user) {
                        sendForbidden(res);
                        res.end(); 
                    } else {
                        next();
                    }
                 }
            } catch (error) {
                sendUnauthorized(res);
                res.end();
            }
        }
    } else {
        next();
    } 
    
}

const sendUnauthorized = function (res) {
    res.status(401).send("Unauthorized");
}

const sendForbidden = function (res) {
    res.status(403).send("Forbidden");
}

const addUserJWTToken = function (res, id, email, role) {
    const jwtToken = JsonWebToken.sign({id: id, email: email, role: role},
        SECRET_JWT_CODE);
    res.header(JWT_HEADER_NAME, jwtToken);
    return jwtToken;
}

const findUserByAuthToken = async function (req, cb) {
    const { authorization } = req.headers;
    if (!authorization) {
        cb(null, null);
    } else {
        const jwt = authorization.split(' ')[1];
        try {
             const decoded = await JsonWebToken.verify(jwt, SECRET_JWT_CODE);
             let user = await UserModel.findOne({_id: decoded.id, token: jwt});
             cb(null, user);
        } catch (error) {
            cb(error, null);
        }
    }
}

const comparePassword = async function (password, expectedPassword, cb) {
    BCrypt.compare(password, expectedPassword, cb);
}
module.exports = {verifyToken, addUserJWTToken, sendForbidden, comparePassword, findUserByAuthToken,verifyTokenOnCreateUser};