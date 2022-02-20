const express = require("express");
const router = express.Router();

module.exports = (db) => {

  //===============LISTS====================


  //Get all lists for a user private and public---works


  router.get("/family", (req, res) => {
    const userId = req.query.userId; 

    const accountId = req.query.accountId;

    db.query(`SELECT DISTINCT user.id as id, account.name as account      
              FROM users
              JOIN accounts ON accounts.id = account_id
              WHERE user_lists.account_id = $1 AND lists.is_private = false OR user_lists.user_id = $2 AND lists.is_private = true ;`, [ accountId, userId ])
      .then(data => {
        const lists = data.rows;
        res.json({ lists });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};
