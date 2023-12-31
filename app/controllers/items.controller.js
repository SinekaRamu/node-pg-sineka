const pgClient = require("../pg-config");

// To get list of items
const getItemsController = async (req, res) => {
  const pgRes = await pgClient.query("SELECT * from items ");
  res.json({
    rows: pgRes.rows,
  });
};
// To add a item
const addItemController = async (req, res) => {
  const queryText =
    "INSERT INTO items(item_name,item_content,price,item_count) VALUES($1,$2,$3,$4) RETURNING *";
  const pgRes = await pgClient.query(queryText, [
    req.body.item_name,
    req.body.item_content,
    req.body.price,
    req.body.item_count,
  ]);
  res.json({
    rows: pgRes.rows,
    count: pgRes.rowCount,
  });
};

// To update item content
const updateItemContentController = async (req, res) => {
  const itemId = req.params.itemId;
  const queryText =
    "UPDATE items set item_content=$1 where item_id=$2 RETURNING *";
  const pgRes = await pgClient.query(queryText, [
    req.body.item_content,
    itemId
  ]);

  res.json({
    rows: pgRes.rows,
    count: pgRes.rowCount,
  });
};

// To get single item
const getSingleItemController = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const pgRes = await pgClient.query(
      "SELECT * FROM items WHERE item_id = $1",
      [itemId]
    );
    if (pgRes.rowCount == 0) {
      res.status(404).json({ error: "Item not found" });
    } else {
      res.json({
        rows: pgRes.rows,
        count: pgRes.rowCount,
      });
    }
  } catch (error) {
    console.error("Error in handling request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// Sort price in ascending order
const sortPriceAscController = async (req, res) => {
  const pgRes = await pgClient.query("SELECT * from items ORDER BY price ASC");
  res.json({
    rows: pgRes.rows,
  });
};

// Sort price in descending order
const sortPriceDescController = async (req, res) => {
  const pgRes = await pgClient.query("SELECT * from items ORDER BY price DESC");
  res.json({
    rows: pgRes.rows,
  });
};

//ascending by item name
const sortItemnameAscController = async (req, res) => {
  const pgRes = await pgClient.query(
    "SELECT * from items ORDER BY item_name ASC"
  );
  res.json({
    rows: pgRes.rows,
  });
};

//Descending by item name
const sortItemnameDescController = async (req, res) => {
  const pgRes = await pgClient.query(
    "SELECT * from items ORDER BY item_name DESC"
  );
  res.json({
    rows: pgRes.rows,
  });
};

// to filter the price range
const filterPriceController = async (req, res) => {
  try {
    if (req.query.priceRange) {
      const priceRanges = req.query.priceRange.split("-");
      const minPrice = parseFloat(priceRanges[0]);
      const maxPrice = parseFloat(priceRanges[1]);

      query = ` SELECT * FROM items WHERE items.price BETWEEN ${minPrice} AND ${maxPrice}`;
    }

    const pgRes = await pgClient.query(query);

    res.json({
      rows: pgRes.rows,
      count: pgRes.rowCount,
    });
  } catch (error) {
    console.error("Error fetching items:", error);
  }
};

// To search
const searchController = async (req, res) => {
  try {
    if (req.query.search) {
      query = `  SELECT * FROM items WHERE item_name ILIKE '%${req.query.search}%'`;
    }
    const pgRes = await pgClient.query(query);
    if (pgRes.rowCount === 0) {
      res.status(404).json({ error: "Item not found" });
    } else {
      res.json({
        rows: pgRes.rows,
        count: pgRes.rowCount,
      });
    }
  } catch (error) {
    console.error("Error fetching items:", error);
  }
};

module.exports = {
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
};