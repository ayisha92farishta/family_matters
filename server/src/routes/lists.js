const express = require("express");
const router = express.Router();

module.exports = (db) => {
  //Get all lists for a user
  router.get("/", (req, res) => {
    userId = 4; //How to get user_id
    db.query(`SELECT lists.name as list, item_name as item
              FROM list_items
              JOIN lists ON list_id = lists.id
              WHERE user_id = $1;`, [ userId ])
      .then(data => {
        const lists = data.rows;
        res.json({ lists });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  //Get specific list for a user
  router.get("/:id", (req, res) => {
    userId = 1; 
    listId = 1;//req.params.id;
    db.query(`SELECT lists.name as list, item_name as item
              FROM list_items
              JOIN lists ON list_id = lists.id
              WHERE user_id = $1 AND list_id = $2;`, [ userId, listId ])
      .then(data => {
        const lists = data.rows;
        res.json({ lists });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  //Create a new list
  router.post("/", (req, res) => {
    console.log(req.body); //Will items be grouped together in an array for one specific list? 
    const listName = 'Chores'; // req.body.list;
    const items = ['Clean the room', 'Clean the dishes']; //req.body.items; Will this be an array ? 
    const userId = 1; //How to get userId ?
    db.query(`INSERT INTO lists (name, is_private) VALUES ($1, $2) RETURNING *;`, [ listName, false ] )
      .then(data => {
        const listId = data.rows[0].id;
        items.forEach((item) => {
          db.query(`INSERT INTO list_items (item_name, list_id, user_id) VALUES ($1, $2, $3) RETURNING *;`, [ item, listId, userId ])
            .then(data => {
              console.log(data.rows[0]);
              const listId = data.rows[0].list_id;
              const newList = {
                list : listId, //how to get list name instead ?
                items : data.rows[0].items //will this be an array ? 
              }
              res.json( {newList} );
            })
            .catch(err => {
              res
                .status(500)
                .json({ error: err.message });
            });
        })
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
    });
    //Update a list
    router.put("/:id", (req, res) => {
      console.log(req.body);
      const { list } = req.body;
      db.query(`INSERT INTO lists (name, is_private) VALUES ($1, $2) RETURNING *;`, [ list, false ] )
      .then(data => {
        const newListName = data.rows[0].name;
        res.json( {newListName} );
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
    })
    //Update an item inside a list
    router.put("/item/:id", (req, res) => {
      console.log(req.body);
      const item = req.body.item;
      const listId = req.body.list_id;
      const userId = 1; //How to get userId ? 
      db.query(`INSERT INTO list_items (item_name, list_id, user_id ) VALUES ($1, $2, $3) RETURNING *;`, [ item, listId, userId ] )
      .then(data => {
        const newItemName = data.rows[0].item_name;
        res.json( {newItemName} );
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
    })
    //Delete a list
    router.delete("/:id", (req, res) => {
      console.log(req.params);
      db.query(`DELETE FROM lists WHERE list_id = $1`, req.params.id)
        .then(data => {
          console.log(data.rows[0]);
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
    })
    //Delete an item from the list
    router.delete("/item/:id", (req, res) => {
      console.log(req,params.id);
      db.query(`DELETE FROM list_items WHERE item_id = $1`, req.params.id)
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