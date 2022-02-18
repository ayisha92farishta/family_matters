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
  //Get all meals for a specific day
  router.get("/day", (req, res) => {
    const accountId = 1;
    const day = "Monday"; //req.body.day
    db.query(`SELECT * FROM meals WHERE account_id = $1 AND day = $2;`, [ accountId, day])
      .then(data => {
        const mealsForDay = data.rows;
        res.json({ mealsForDay });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  //Get a specific meal for a specific day
  router.get("/day/:id", (req, res) => {
    const accountId = 1;
    const mealId = 1; //req.params.id;
    const day = "Monday"; //req.body.day
    db.query(`SELECT * FROM meals WHERE account_id = $1 AND day = $2 AND id = $3;`, [ accountId, day, mealId])
      .then(data => {
        const meal = data.rows;
        res.json({ meal });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  //Create a new meal
  router.post("/", (req, res) => {
    console.log('post = ', req.body);
    const day = req.body.day;
    const breakfast = req.body.breakfast;
    const lunch = req.body.lunch;
    const snack = req.body.snack;
    const dinner = req.body.dinner;
    let dayId = 1;
    switch(day) {
      case "Sunday":
        dayId = 1;
        break;
      case "Monday":
        dayId = 2;
        break;
      case "Tuesday":
       dayId = 3;
        break;
      case "Wednesday":
        dayId = 4;
        break;
      case "Thursday":
        dayId = 5;
        break;
      case "Friday":
       dayId = 6;
        break;
      case "Saturday":
        dayId = 7;
        break;
      default:
        dayId = 1;
    }
    const accountId = req.query.accountId;
    db.query(`INSERT INTO meals (breakfast, lunch, snack, dinner, day_id, account_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`, [ breakfast, lunch, snack, dinner, dayId, accountId])
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
  router.put("/:id", (req, res) => {
    const mealId = req.params.id;
    const accountId = 1;
    const { day, meal_type, description } = req.body;
    const values = [day, meal_type, description, accountId, mealId];
    db.query(`UPDATE meals SET day = $1, meal_type = $2, description = $3, account_id = $4 WHERE id = $5 ;`, values)
      .then(data => {
        console.log(data.rows[0]);
        const updatedMeal = {
          day : data.rows[0].day,
          meal_type : data.rows[0].meal_type,
          description : data.rows[0].decsription
        }
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
    db.query(`DELETE FROM meals WHERE id = $1`, [mealId])
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