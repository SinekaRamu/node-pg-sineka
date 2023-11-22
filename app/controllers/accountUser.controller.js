const pgClient = require('../pg-config');
const Joi = require("joi");

//get Users
const getUsers = async (req,res) => {
    const pgRes = await pgClient.query('select * from account_users au');

    res.json({
        rows: pgRes.rows,
        count: pgRes.rowCount,
    });
}


// Add user account
// const addUserController = async (req, res, next) => {
//   const searchQuery = 'select * from account_users au where email = VALUES($1) or user_name = VALUES($2)';
//   const searchPgRes = await pgClient.query(searchQuery, [req.body.email, req.body.user_name]);

//   console.log(searchQuery.rows)
    
//     res.json({
//         rows: searchPgRes.rows,
//         count: searchPgRes.rowCount,
//     });
// }

const addUserController = async (req, res) => {
  const queryText =
    "INSERT INTO items(first_name, last_name, user_name, email, user_password, phone_no) VALUES($1,$2,$3,$4, $5, $6) RETURNING item_id,item_name";
  const pgRes = await pgClient.query(queryText, [
    req.body.first_name,
    req.body.last_name,
    req.body.user_name,
    req.body.email,
    req.body.user_password,
    req.body.phone_no,
  ]);

  res.json({
    rows: pgRes.rows,
    count: pgRes.rowCount,
  });
};

module.exports = {
    addUserController,
    getUsers
}
