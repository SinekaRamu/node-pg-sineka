const express = require("express");
const router = express.Router();
const { validate } = require("../middlewares/validate.middleware");
const {
  itemaddSchema,
  updateitemSchema,
} = require("../validation/items.schema");

const {
  addItemController,
  updateItemContentController,
  getSingleItemController,
  getItemsController,
  sortPriceAscController,
  sortPriceDescController,
  sortItemnameAscController,
  sortItemnameDescController,
  filterPriceController,
  searchController,
} = require("../controllers/items.controller");
const { overallRatingController } = require("../controllers/rating.controller");

router.get("/", getItemsController);
router.post("/add", validate(itemaddSchema), addItemController);
router.patch(
  "/:itemId",
  validate(updateitemSchema),
  updateItemContentController
);
router.get("/:itemId", getSingleItemController);

router.get("/sort/asc-by-price", sortPriceAscController);
router.get("/sort/desc-by-price", sortPriceDescController);
router.get("/sort/asc-by-itemname", sortItemnameAscController);
router.get("/sort/desc-by-itemname", sortItemnameDescController);
router.get("/filter", filterPriceController);
router.get("/search", searchController);

//overall rating
router.get("/rating", overallRatingController);

module.exports = router;