const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  //Get all public meals for one whole week
  router.get("/", (req, res) => {
    console.log('req.query = ', req.query)
    const accountId = req.query.accountId;
      db.query(`SELECT * FROM meals WHERE account_id = $1;`, [ accountId ])
      .then((data => {
        const mealsForWeek = data.rows;
        //console.log('meals = ', mealsForWeek)
        return res.json({ mealsForWeek });
      }))
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

    
  });
  
  //Create a meals for whole week
  router.post("/", (req, res) => {
    console.log('post = ', req.body);
    const day = req.body.day;
    const breakfast = req.body.breakfast;
    const lunch = req.body.lunch;
    const snack = req.body.snack;
    const dinner = req.body.dinner;
    
    const accountId = req.query.accountId;
    db.query(`INSERT INTO meals (day, breakfast, lunch, snack, dinner, account_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`, [ day, breakfast, lunch, snack, dinner, accountId])
      .then(data => {
        console.log(data.rows[0]);
        const newMeal = data.rows;
        res.json({ newMeal} )
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  }) 
  //Update an existing meal 
  router.put("/", (req, res) => {
    const mealId = req.query.mealId;
    const accountId = req.query.accountId;
    const { day, breakfast, lunch, snack, dinner } = req.body;
    const values = [day, breakfast, lunch, snack, dinner, accountId, mealId];
    db.query(`UPDATE meals SET day = $1, breakfast = $2, lunch = $3, snack = $4, dinner = $5, account_id = $6 WHERE id = $7 RETURNING *;`, values)
      .then(data => {
        console.log(data.rows[0]);
        const updatedMeal = {
          id: data.rows[0].id,
          day: data.rows[0].day,
          breakfast : data.rows[0].breakfast,
          lunch : data.rows[0].lunch,
          snack : data.rows[0].snack,
          dinner : data.rows[0].dinner
        };
        res.json({ updatedMeal} )
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  })
  //Delete a meal 
  router.delete("/:id", (req, res) =>{
    const mealId = req.params.id;
    db.query(`DELETE FROM meals WHERE id = $1;`, [mealId])
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