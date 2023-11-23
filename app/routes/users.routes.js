const express = require('express');
const router = express.Router();

const {
    addUserController,
    loginController,
} = require ('../controllers/accountUser.controller');
const { validate } = require('../middlewares/validate.middleware');
const { signUpSchema } = require('../validation/authentication.schema');

//CREATE USER ACCOUNT
router.post("/signup", validate(signUpSchema), addUserController);

//LOGIN
router.post("/login", loginController);

module.exports = router;