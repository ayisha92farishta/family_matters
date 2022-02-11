const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

module.exports = (db) => {
  
  router.post('/login', (req, res) => {
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;
    db.query(`SELECT id, first_name, password FROM users WHERE email = $1`, [email])
    .then((data) => {
      const first_name = data.rows[0].first_name;
      const dbPass = data.rows[0].password;

      if (!bcrypt.compareSync(password, dbPass)) {
        return res.send('Invalid user! Please enter a valid email and password')
      } 
      const login_data = {
        user_id : data.rows[0].id
      };
      res.json( login_data )
    })
    .catch((err) => {
      res.status(500);
      console.log(err);
      
    });
  });

  router.post('/register', (req, res) => {
    console.log(req.body);

  });
  return router;
}