const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  //Get all public and user recipes 
  router.get("/", (req, res) => {
    const accountId = 4; 
    db.query(`SELECT * FROM recipes WHERE account_id = $1;`, [ accountId])
      .then(data => {
        const recipes = data.rows;
        res.json({ recipes });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  //Get specific recipe for a user
  router.get("/:id", (req, res) => {
    const userId = 1;
    const recipe_id = 1; //req.params.id
    db.query(`SELECT * FROM recipes WHERE user_id = $1 AND id = $2;`, [ userId, recipe_id])
      .then(data => {
        const recipe = data.rows;
        res.json({ recipe });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  //Create a new recipe for a user
  router.post("/", (req, res) => {
    console.log(req.body);
    const { name, preparation_time, cooking_time, serving, ingredients, instructions } = req.body;
    const userId = 1;
    const account_id = 1;
    db.query(`INSERT INTO recipes (name , preparation_time, cooking_time, serving, ingredients, instructions, account_id, user_id ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`, [ name, preparation_time, cooking_time, serving, ingredients, instructions, account_id, userId ])
      .then(data => {
        console.log(data.rows[0]);
        const newRecipe = {
          name : data.rows[0].name,
          preparation_time : data.rows[0].preparation_time,
          cooking_time : data.rows[0].cooking_time,
          serving : data.rows[0].serving,
          ingredients : data.rows[0].ingredients,
          instruction : data.rows[0].instructions
        }
        res.json( {newRecipe} );
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  }) 
  //Update an existing recipe for a user
  router.put("/:id", (req, res) => {
    const recipe_id = req.params.id;
    const userId = 1;
    const { name, preparation_time, cooking_time, serving, ingredients, instructions } = req.body;
    const values = [name, preparation_time, cooking_time, serving, ingredients, instructions, recipe_id, userId];
    db.query(`UPDATE recipes SET name = $1, preparation_time = $2, cooking_time = $3, serving = $4, ingredients = $5, instructions = $6 WHERE id = $7 AND user_id = $8;`, values)
      .then(data => {
        console.log(data.rows[0]);
        const updatedRecipe = {
          name : data.rows[0].name,
          preparation_time : data.rows[0].preparation_time,
          cooking_time : data.rows[0].cooking_time,
          serving : data.rows[0].serving,
          ingredients : data.rows[0].ingredients,
          instruction : data.rows[0].instructions
        }
        res.json( {updatedRecipe} );
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  })
  //Delete a recipe for a user
  router.delete("/:id", (req, res) =>{
    const recipeId = req.params.id;
    db.query(`DELETE FROM recipes WHERE id = $1`, [recipeId])
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