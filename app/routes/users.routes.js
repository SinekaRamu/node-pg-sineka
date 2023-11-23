const express = require('express');
const router = express.Router();

const {
    addUserController,
    loginController,
    updateUserController,
    getAccountController,
} = require ('../controllers/accountUser.controller');
const { validate } = require('../middlewares/validate.middleware');
const { signUpSchema, updateUserSchema } = require('../validation/authentication.schema');

//CREATE USER ACCOUNT
router.post("/signup", validate(signUpSchema), addUserController);

//LOGIN
router.post("/login", loginController);

//UPDATE USER DATA
router.put("/:id", validate(updateUserSchema), updateUserController);

//VIEW THE USER DATA
router.get("/:id", getAccountController);

module.exports = router;