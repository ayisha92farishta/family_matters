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
    const user_id = req.query.user_id;
    const account = req.query.account_id;

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

  //Save the new event (POST)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
  router.post('/', (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const startDate = req.body.startDate;
    const location =  req.body.location;
    const user_id = req.body.user_id;
    const account_id = req.body.account_id;
    values = [title, description, startDate, location];
    db.query(`INSERT INTO events (event_name, event_description, event_date, event_address) VALUES ($1, $2, $3, $4) RETURNING *;`,values)
      .then((data) => {
        console.log(data.rows[0]);
        const event_id = data.rows[0].id;
        db.query(`INSERT INTO user_events (user_id, event_id, account_id) VALUES ($1, $2, $3) RETURNING *;`,[user_id, event_id, account_id, ])
        .then((data) => {
          // console.log(data.rows[0]);
          // const newUser = {
          //   firstName: data.rows[0].first_name,
          //   lastName: data.rows[0].last_name
          // }
          res.json( {title, description, startDate, location} );//event id?
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
    
    //res.json({title, description, startDate, location, event_id})
      //res.send(req.body);
  });                                                                                                                                                                                                                            

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



