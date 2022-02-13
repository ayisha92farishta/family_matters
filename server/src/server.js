// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8001;
//const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const { Pool } = require("pg");
const dbParams = require("./lib/db");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));//??



// Separated Routes for each Resource
const usersRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const eventsRoutes = require("./routes/events");

// Mount all resource routes
//app.use("/", usersRoutes(db));
app.use("/", usersRoutes(db));
app.use("/api/auth", authRoutes(db));
app.use("/api/events", eventsRoutes(db));

// Home page
app.get("/", (req, res) => {
  //res.render("index");
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

//--------------------------------------------------------------

//COMEBACK LATER

// app.use(
//   "/styles",
//   sassMiddleware({
//     source: __dirname + "/styles",
//     destination: __dirname + "/public/styles",
//     isSass: false, // false => scss, true => sass
//   })
// );

//app.use(express.static("public"));