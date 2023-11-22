const express = require('express');
const router = express.Router();

const {
    getUsers, 
    addUserController
} = require ('../controllers/accountUser.controller');

//GET
router.get ('/', getUsers)

//CREATE
router.post ('/signup', addUserController);

module.exports = router;