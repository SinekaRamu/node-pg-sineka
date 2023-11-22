const pgClient = require('../pg-config');

//get Users
const getUsers = async (req,res) => {
    const pgRes = await pgClient.query('select * from account_users au');

    res.json({
        rows: pgRes.rows,
        count: pgRes.rowCount,
    });
}


// Add user account

const addUserController = (req, res, next) => {
    if (!req.body.title || !req.body.isbn) {
      return next({ code: 400, message: "book should have title and isbn" });
    }
    const book = addBook({
      title: req.body.title,
      isbn: req.body.isbn,
    });
    return res.json(book);
}

module.exports = {
    addUserController,
    getUsers
}