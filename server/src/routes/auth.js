const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

module.exports = (db) => {
  
  router.post('/login', (req, res) => {
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;
    db.query(`SELECT id, first_name, password, account_id FROM users WHERE email = $1`, [email])    
      
    .then((data) => {
      
      const first_name = data.rows[0].first_name;
      
      const dbPass = data.rows[0].password;

      if (!bcrypt.compareSync(password, dbPass)) {
        return res.send('Invalid user! Please enter a valid email and password')
      } 
      const login_data = {
        first_name : data.rows[0].first_name,
        user_id : data.rows[0].id, 
        account_id : data.rows[0].account_id
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
    const firstName = req.body.first_name;
    const lastName = req.body.last_name;
    const email = req.body.email;
    let is_primary = true;
    const name = req.body.last_name; 
    const value = [name];
    const hashedPassword = bcrypt.hashSync(req.body.password, 10)

    if (req.body.name === '' || req.body.email === '' || req.body.password === '') {
      res.statusCode = 400;
      return res.send('Error : Invalid username or email or password.');
    }
    db.query(`INSERT INTO accounts (name) VALUES ($1) RETURNING *;`,value )
      .then((data) => {
        console.log(data.rows[0]);
        const account_id = data.rows[0].id;
        const values = [firstName, lastName, email, hashedPassword, is_primary, account_id];
        console.log(values);
        db.query(`INSERT INTO users (first_name, last_name, email, password, is_primary, account_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`, values)
          .then((data) => {
            console.log(data.rows[0]);
            const newUser = {
              firstName: data.rows[0].first_name,
              lastName: data.rows[0].last_name
            }
            res.json( newUser );
          })
          .catch(err => {
            res
              .status(500)
              .json({ error: err.message });
          });
        })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
    
  });
  return router;
}