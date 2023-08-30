const express = require('express');
const mongoose = require('mongoose');
const BCrypt = require('bcryptjs');
const JsonWebToken = require('jsonwebtoken');
const BodyParser = require('body-parser');

const app = express();
const userRoutes = require('./routes/userRoutes.js');
const loginRoutes = require('./routes/loginRoutes.js');
const logoutRoutes = require('./routes/logoutRoutes.js');
const recipeRoutes = require('./routes/recipeRoutes.js');
const mealPlanRoutes = require('./routes/mealPlanRoutes.js');
const shoppingListRoutes = require('./routes/shoppingListRoutes.js');
const authUtil = require('./auth/authUtil');

const {SERVER_PORT, DB_CONNECTION_STRING} = require('./constants.js');

app.use(express.json());
app.get("/api/users", async function (req, res, next) {
    await authUtil.verifyToken(req, res, next, true, null);});
// app.post("/api/users", async function (req, res, next) {
//     await authUtil.verifyTokenOnCreateUser(req, res, next);});
app.put("/api/users/:id", async function (req, res, next) {
    await authUtil.verifyToken(req, res, next, false, req.params.id, true);});
app.get("/api/users/:id", async function (req, res, next) {
    await authUtil.verifyToken(req, res, next, false, req.params.id, false);});
app.delete("/api/users/:id", async function (req, res, next) {
    await authUtil.verifyToken(req, res, next, false, req.params.id, false);});
app.use('/api/users', userRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/logout', logoutRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/mealPlans', mealPlanRoutes);
app.use('/api/shoppingLists', shoppingListRoutes);

mongoose.connect(DB_CONNECTION_STRING);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

 // Add db as app local property
 app.locals.db = database;

 // Starting the server
 app.listen(SERVER_PORT, err => {
   if (err) {
     throw err;
   }
   console.log(`App listening on port ${SERVER_PORT}!`);
 });
