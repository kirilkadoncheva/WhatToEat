const express = require('express');
const mongoose = require('mongoose');
const BCrypt = require('bcryptjs');
const JsonWebToken = require('jsonwebtoken');
const cors = require('cors');
var bodyParser = require('body-parser'); 

const app = express();
const userRoutes = require('./routes/userRoutes.js');
const loginRoutes = require('./routes/loginRoutes.js');
const logoutRoutes = require('./routes/logoutRoutes.js');
const recipeRoutes = require('./routes/recipeRoutes.js');
const mealPlanRoutes = require('./routes/mealPlanRoutes.js');
const shoppingListRoutes = require('./routes/shoppingListRoutes.js');
const authUtil = require('./auth/authUtil');
const recipeService = require('./services/recipesService.js');
const mealPlanService = require('./services/mealPlanService.js');
const shoppingListService = require('./services/shoppingListService.js');

const {SERVER_PORT, DB_CONNECTION_STRING} = require('./constants.js');

app.use(bodyParser.json({limit: "50mb"}));
app.use(express.json());
app.use(cors());
app.get("/api/users", async function (req, res, next) {
    await authUtil.authorizeRequest(req, res, next, function(user, decodedJWT) {
        let isAdmin = decodedJWT.role === 'administrator';
        if (!isAdmin) {
            res.status(403).send("Forbidden");
            res.end();
        }
    });
});
app.post("/api/users", async function (req, res, next) {
    await authUtil.verifyTokenOnCreateUser(req, res, next);
});
app.put("/api/users/:id", async function (req, res, next) {
    await authUtil.authorizeRequest(req, res, next, function(user, decodedJWT) {
        let isAdmin = decodedJWT.role === 'administrator';
        if (req.params.id != decodedJWT.id && !isAdmin) {
            console.log("forbidden1");
            res.status(403).send("Forbidden");
            res.end();
        } else if (req.body.role === 'administrator' && !isAdmin) {
            console.log("forbidden1");
            res.status(403).send("Forbidden");
            res.end();
        }
    });
});
app.get("/api/users/:id", async function (req, res, next) {
    await authUtil.authorizeRequest(req, res, next, function(user, decodedJWT) {
        let isAdmin = decodedJWT.role === 'administrator';
        if (req.params.id != decodedJWT.id && !isAdmin) {
            res.status(403).send("Forbidden");
            res.end();
        } 
    });
});
app.delete("/api/users/:id", async function (req, res, next) {
    await authUtil.authorizeRequest(req, res, next, function(user, decodedJWT) {
        let isAdmin = decodedJWT.role === 'administrator';
        if (req.params.id != decodedJWT.id && !isAdmin) {
            res.status(403).send("Forbidden");
            res.end();
        }
    });
});

app.use('/api/users', userRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/logout', logoutRoutes);

app.put("/api/recipes/:id", async function (req, res, next) {
    await authUtil.authorizeRequest(req, res, next, async function (user, decodedJWT) {
        await recipeService.verifyUserIsRecipeOwnerOrAdmin(user, decodedJWT, req, res);
    });
});

app.delete("/api/recipes/:id", async function (req, res, next) {
    await authUtil.authorizeRequest(req, res, next, async function (user, decodedJWT) {
        await recipeService.verifyUserIsRecipeOwnerOrAdmin(user, decodedJWT, req, res);
    });
});
app.post("/api/recipes", async function (req, res, next) {
    await authUtil.authorizeRequest(req, res, next, function(user, decoded) {});
});
app.use("/api/recipes", function (req, res, next) {
    next();
});
app.use("/api/recipes/:id", function (req, res, next) {
    next();
});
app.post("/api/recipes/:id/reviews", async function (req, res, next) {
    await authUtil.authorizeRequest(req, res, next, async function (user, decodedJWT) {
        await recipeService.verifyUserIsNotRecipeOwner(user, decodedJWT, req, res);
    });
});
app.delete("/api/recipes/:id/reviews/:reviewId", async function (req, res, next) {
    await authUtil.authorizeRequest(req, res, next, async function (user, decodedJWT) {
        await recipeService.verifyUserIsReviewOwnerOrAdmin(user, decodedJWT, req, res);
    });
});
app.use("/api/recipes/:id/reviews", function (req, res, next) {
    next();
});
app.use("/api/recipes/:id/reviews/:reviewId", function (req, res, next) {
    next();
});
app.use('/api/recipes', recipeRoutes);

app.post("/api/mealPlans", async function (req, res, next) {
    await authUtil.authorizeRequest(req, res, next, function(user, decoded) {
    });
});

app.get("/api/mealPlans", async function (req, res, next) {
    await authUtil.authorizeRequest(req, res, next, function(user, decoded) {
        let queryOwnerId = req.query.ownerId;
        let loggedInUserId = decoded.id;
        let isAdmin = decoded.role === 'administrator';
        if (!(queryOwnerId === null || queryOwnerId === undefined)) {
            if (loggedInUserId != queryOwnerId && !isAdmin) {
                res.status(403).send("Forbidden");
                res.end();
            }
        }
    });
});

app.all("/api/mealPlans", async function (req, res, next) {
    await authUtil.authorizeRequest(req, res, next, function(user, decoded) {
    });
});

app.all("/api/mealPlans/:planId", async function (req, res, next) {
    await authUtil.authorizeRequest(req, res, next, async function(user, decodedJWT) {
        let isAdmin = decodedJWT.role === 'administrator';
        let mealPlan = await mealPlanService.getMealPlanById(req.params.planId);
        if (mealPlan === null || mealPlan === undefined) {
            res.status(403).send("Forbidden");
            res.end();
        } else {
            console.log(mealPlan);
            if (!mealPlan.owner.equals(user._id) && !isAdmin) {
                res.status(403).send("Forbidden");
                res.end();
            }
        }
    });
});
app.use('/api/mealPlans', mealPlanRoutes);

app.get("/api/shoppingLists", async function (req, res, next) {
    await authUtil.authorizeRequest(req, res, next, function(user, decoded) {
        let queryOwnerId = req.query.ownerId;
        let loggedInUserId = decoded.id;
        let isAdmin = decoded.role === 'administrator';
        if (!(queryOwnerId === null || queryOwnerId === undefined)) {
            if (loggedInUserId != queryOwnerId && !isAdmin) {
                res.status(403).send("Forbidden");
                res.end();
            }
        }
    });
});

app.all("/api/shoppingLists", async function (req, res, next) {
    await authUtil.authorizeRequest(req, res, next, function(user, decoded) {
    });
});


app.all("/api/shoppingLists/:listId", async function (req, res, next) {
    await authUtil.authorizeRequest(req, res, next, async function(user, decodedJWT) {
        let isAdmin = decodedJWT.role === 'administrator';
        let list = await shoppingListService.getShoppingListById(req.params.listId);
        console.log(list);
        if (list === null || list === undefined) {
            res.status(403).send("Forbidden");
            res.end();
        } else {
            if (!list.owner.equals(user._id) && !isAdmin) {
                res.status(403).send("Forbidden");
                res.end();
            }
        }
    });
});

app.all("/api/shoppingLists/:listId/ingredients", async function (req, res, next) {
    await authUtil.authorizeRequest(req, res, next, async function(user, decodedJWT) {
        let isAdmin = decodedJWT.role === 'administrator';
        let list = await shoppingListService.getShoppingListById(req.params.listId);
        if (list === null || list === undefined) {
            res.status(403).send("Forbidden");
            res.end();
        } else {
            if (!list.owner.equals(user._id) && !isAdmin) {
                res.status(403).send("Forbidden");
                res.end();
            }
        }
    });
});
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
