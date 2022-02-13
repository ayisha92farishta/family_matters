const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  //Get all contacts for a user
  router.get("/", (req, res) => {
    const userId = 1;
    db.query(`SELECT * FROM contacts WHERE user_id = $1;`, [ userId])
      .then(data => {
        const contacts = data.rows;
        res.json({ contacts });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  //Get specific contact for a user
  router.get("/:id", (req, res) => {
    const userId = 1;
    const contact_id = 1; //req.params.id
    db.query(`SELECT * FROM contacts WHERE user_id = $1 AND id = $2;`, [ userId, contact_id])
      .then(data => {
        const contacts = data.rows;
        res.json({ contacts });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  //Create a new contact for a user
  router.post("/", (req, res) => {
    console.log(req.body);
    const { name, phone_number, email, address } = req.body;
    const userId = 1;
    const accountId = 1;
    db.query(`INSERT INTO contacts (name, phone_number, email, address, account_id, user_id) VALUES ($1, $2, $3, $4, $5, $6)`, [ name, phone_number, email, address, accountId, userId])
      .then(data => {
        console.log(data.rows[0]);
        const newContact = {
          name : data.rows[0].name,
          phone_number : data.rows[0].phone_number,
          email : data.rows[0].email,
          address : data.rows[0].address
        }
        res.json( {newContact} );
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  }) 
  //Update an existing contact for a user
  router.put("/:id", (req, res) => {
    const contact_id = req.params.id;
    const userId = 1;
    const { name, phone_number, email, address } = req.body;
    const values = [name, phone_number, email, address, contact_id, userId];
    db.query(`UPDATE contacts SET name = $1, phone_number = $2, email = $3, address = $4 WHERE id = $5 AND user_id = $6;`, values)
      .then(data => {
        console.log(data.rows[0]);
        const updatedContact = {
          name : data.rows[0].name,
          phone_number : data.rows[0].phone_number,
          email : data.rows[0].email,
          address : data.rows[0].address
        }
        res.json({ updatedContact} )
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  })
  //Delete a contact for a user
  router.delete("/:id", (req, res) =>{
    const contactId = req.params.id;
    db.query(`DELETE FROM contacts WHERE id = $1`, [contactId])
      .then(data => {
        console.log(data.rows[0]);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  })
  return router;
};