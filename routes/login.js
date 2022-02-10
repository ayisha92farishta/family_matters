const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

module.exports = (db) => {
  
  router.post('/', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    db.query(`SELECT id, first_name, password FROM users WHERE email = $1`, [email])
    .then((data) => {
      const first_name = data.rows[0].first_name;
      const dbPass = data.rows[0].password;
      if (bcrypt.compareSync(password, dbPass)) {
        req.session.user_id = data.rows[0].id;
        req.session.name = first_name;
        const login_data = {
          first_name
        };
        res.json( { login_data })
      } else {
        res.send('Invalid user! Please enter a valid email and password');
      }
    })
    .catch((err) => {
      res.status(500);
      console.log(err);
      
    });
  })
  return router;
}