const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  //Get all public and user recipes 
  router.get("/", (req, res) => {
    const accountId = req.query.accountId; 
    db.query(`SELECT recipes.*
              FROM recipes
              WHERE account_id = $1;`, [ accountId])
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
    const userId = req.query.userId;
    const recipe_id = req.params.id;
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
    console.log('post req.body = ', req.body);
    const { name, thumbnail_photo_url, preparation_time, cooking_time, serving, ingredients, instructions } = req.body;
    const userId = req.query.userId;
    const account_id = req.query.accountId;
    db.query(`INSERT INTO recipes (name , thumbnail_photo_url,  preparation_time, cooking_time, serving, ingredients, instructions, account_id, user_id ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`, [ name, thumbnail_photo_url, preparation_time, cooking_time, serving, ingredients, instructions, account_id, userId ])
      .then(data => {
        console.log(data.rows[0]);
        const newRecipe = {
          name : data.rows[0].name,
          thumbnail_photo_url : data.rows[0].thumbnail_photo_url,
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
  router.put("/", (req, res) => {
    console.log('edit req.body = ', req.body);
    const recipe_id = req.query.recipeId;
    const userId = req.query.userId;
    const { name, thumbnail_photo_url, preparation_time, cooking_time, serving, ingredients, instructions } = req.body;
    //console.log(req.body)
    const values = [name, thumbnail_photo_url, preparation_time, cooking_time, serving, ingredients, instructions, recipe_id, userId];
    console.log('values = ', values)
    db.query(`UPDATE recipes SET name = $1, thumbnail_photo_url = $2, preparation_time = $3, cooking_time = $4, serving = $5, ingredients = $6, instructions = $7 WHERE id = $8 AND user_id = $9 RETURNING *;`, values)
      .then(data => {
        console.log('after update = ', data.rows[0]);
        const updatedRecipe = {
          id: data.rows[0].id,
          name : data.rows[0].name,
          thumbnail_photo_url : data.rows[0].thumbnail_photo_url,
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