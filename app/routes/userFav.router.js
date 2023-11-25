const express = require("express");
const router = express.Router();

const {
  addfavouritecontroller, getFavController,
} = require("../controllers/userFav.controller");
const { addRatingController } = require("../controllers/rating.controller");
const { addToCartController } = require("../controllers/carts.controller");
const { buyItemController, PurchasesListController, updateStatusController, cancelListController } = require("../controllers/purchase.controller");
const { ratingValueSchema } = require("../validation/rating.schema");
const { addToCartSchema } = require("../validation/carts.schema");
const { buyItemSchema } = require("../validation/purchase.schema");
const { validate } = require("../middlewares/validate.middleware");


router.post("/favourites", addfavouritecontroller);
router.post("/addRating", validate(ratingValueSchema), addRatingController);
router.post("/addToCart", validate(addToCartSchema), addToCartController);
router.post("/buyItem", validate(buyItemSchema), buyItemController);
router.get("/purchaselist/:user_id", PurchasesListController);

router.put("/cancelOrder", updateStatusController);

+
router.get("/favourites", getFavController);

// CANCEL::
router.get("/cancelList", cancelListController);

module.exports = router;