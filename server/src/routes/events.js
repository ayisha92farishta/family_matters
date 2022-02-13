const express = require('express');
const router  = express.Router();
const bcrypt = require("bcryptjs");

module.exports = (db) => {
  const user_id = 4;
  const account = 3;
  const my_event = 4;
  const event_it_to_del = 1;
//Get all events (GET) for user (public events and the user's events)
  router.get('/', (req, res) => {
    //This is hardcoded we should get user_id and account_id from req.body
    

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
      res.json(data.rows)
    })
    .catch((err) => {
      res.status(500);
      console.log(err);
    });
  });

  // //Add a new event (GET) - new event form needs to be created
  // router.get('/events', (req, res) => {

  // });

  // //Save the new event (POST)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
  // router.post('/events', (req, res) => {

  // });                                                                                                                                                                                                                            

  //Remove an event (DELETE)
  router.delete('/:id', (req, res) => {                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
    
    db.query(`DELETE FROM events WHERE id = $1`,[event_it_to_del])
    .then((data) => {
      res.json(data.rows)
    })
    .catch((err) => {
      res.status(500);
      console.log(err);
    });
  });

  // //Modify an existing event (PUT)
  // router.put('/events', (req, res) => {

  // });

   //view a specific event info (GET)
  router.get('/:id', (req, res) => {

    db.query(`SELECT events.* FROM events WHERE id = $1`,[my_event])
    .then((data) => {
      res.json(data.rows)
    })
    .catch((err) => {
      res.status(500);
      console.log(err);
    });
  });

  return router;
};



