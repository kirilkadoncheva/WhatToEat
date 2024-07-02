const JsonWebToken = require('jsonwebtoken');
const {SECRET_JWT_CODE, JWT_HEADER_NAME} = require('../constants.js');
const BCrypt = require('bcryptjs');
const BodyParser = require('body-parser');
const UserModel = require('../models/userModel.js');

const authorizeRequest = async (req, res, next, cb) => {
    const { authorization } = req.headers;
    if (!authorization) {
        sendUnauthorized(res);
        res.end();
    } else {
        const jwt = authorization.split(' ')[1];
        try {
             const decoded = await JsonWebToken.verify(jwt, SECRET_JWT_CODE);
             let user = await UserModel.findOne({_id: decoded.id, token: jwt});
            if (user === null || user === undefined) {
                console.log('no such user');
                sendForbidden(res);
                res.end(); 
            } else {
                await cb(user, decoded);
                next();
            }
        } catch (error) {
            console.error(error);
            sendUnauthorized(res);
            res.end();
        }
    }
}

const verifyTokenOnCreateUser = async (req, res, next) => {
    var roleInBody = req.body.role;
    console.log(roleInBody);
    console.log(roleInBody === 'administrator');
    if (roleInBody === 'administrator') {
        const { authorization } = req.headers;
        if (!authorization) {
            console.log(authorization);
            sendUnauthorized(res);
            res.end();
        } else {
            const jwt = authorization.split(' ')[1];
            console.log(jwt);
            try {
                 const decoded = await JsonWebToken.verify(jwt, SECRET_JWT_CODE);
                 var isAdmin = decoded.role == 'administrator';
                 console.log(isAdmin);
                 if (!isAdmin) {
                    sendForbidden(res);
                    res.end();
                 }  
                 else {
                    let user = await UserModel.findOne({_id: decoded.id, token: jwt});
                    if (!user) {
                        sendForbidden(res);
                        res.end(); 
                    } else {
                        next();
                    }
                 }
            } catch (error) {
                console.error(error);
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
    console.log("forbidden");
    res.status(403).send("Forbidden");
}

const addUserJWTToken = function (res, id, email, role) {
    const jwtToken = JsonWebToken.sign({id: id, email: email, role: role},
        SECRET_JWT_CODE);
    return jwtToken;
}

const findUserByAuthToken = async function (req, cb) {
    const { authorization } = req.headers;
    if (!authorization) {
        cb(null, null);
        return null;
    } else {
        const jwt = authorization.split(' ')[1];
        try {
             const decoded = await JsonWebToken.verify(jwt, SECRET_JWT_CODE);
             let user = await UserModel.findOne({_id: decoded.id, token: jwt});
             cb(null, user);
             return user;
        } catch (error) {
            cb(error, null);
            return null;
        }
    }
}

const comparePassword = async function (password, expectedPassword, cb) {
    BCrypt.compare(password, expectedPassword, cb);
}
module.exports = {authorizeRequest, addUserJWTToken, sendForbidden, comparePassword, findUserByAuthToken, verifyTokenOnCreateUser};