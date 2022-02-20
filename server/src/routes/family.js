const express = require("express");
const router = express.Router();

module.exports = (db) => {

  //===============LISTS====================


  //Get all members for a particular account


  router.get("/", (req, res) => {
   // const userId = req.query.userId; 
    const accountId = req.query.accountId;
    console.log(accountId)
    db.query(`SELECT DISTINCT users.first_name as first_name,users.last_name as last_name, users.email as email, users.created_at as joined_on, accounts.name as family_name      
              FROM users
              JOIN accounts ON accounts.id = account_id
              WHERE users.account_id = $1 ;`,  [accountId] )
      .then(data => {
        console.log(data)
        const familyMembers = data.rows;
        res.json({ familyMembers });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};
