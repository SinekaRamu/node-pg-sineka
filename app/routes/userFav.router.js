const express = require("express");
const router = express.Router();

const {
  addfavouritecontroller,
} = require("../controllers/userFav.controller");


router.post("/favourites", addfavouritecontroller);

module.exports = router;
