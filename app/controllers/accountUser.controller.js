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
const addUserController = async (req, res, next) => {
  const searchQuery = 'select * from account_users au where email = VALUES($1) or user_name = VALUES($2)';
  const searchPgRes = await pgClient.query(searchQuery, [req.body.email, req.body.user_name]);

  console.log(searchQuery.rows)
    
    res.json({
        rows: searchPgRes.rows,
        count: searchPgRes.rowCount,
    });
}

module.exports = {
    addUserController,
    getUsers
}
