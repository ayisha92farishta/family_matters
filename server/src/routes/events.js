const express = require('express');
const router  = express.Router();
const bcrypt = require("bcryptjs");

module.exports = (db) => {
//Get all events (GET) for user (public events and the user's events)
  router.get('/', (req, res) => {
    //This is hardcoded we should get user_id and account_id from req.body
    const user_id = 4;
    const account = 3;

    // db.query(`SELECT account_id FROM users
    //            WHERE users.id = $1`, [user_id])
    //   .then((data) => {
    //     account = data.rows[0].account_id;
    //     console.log(account);
    //   });

    db.query(`SELECT DISTINCT events.* FROM events join user_events on
              events.id = user_events.event_id WHERE
              user_events.account_id = $1 AND events.is_private = false OR
              user_events.user_id = $2 AND events.is_private = true`,[account, user_id])
    .then((data) => {
      //console.log("hi", data.rows);
      res.json(data.rows)
    })
    .catch((err) => {
      res.status(500);
      console.log(err);
    });
  });

  // //Add a new event (GET)
  // router.get('/events', (req, res) => {

  // });

  // //Save the new event (POST)
  // router.post('/events', (req, res) => {

  // });

  // //Remove an event (DELETE)
  // router.delete('/events', (req, res) => {

  // });

  // //Modify an existing event (UPDATE)
  // router.update('/events', (req, res) => {

  // });

  // //view a specific event info (GET)
  // router.get('/events', (req, res) => {

  // });

  return router;
};



