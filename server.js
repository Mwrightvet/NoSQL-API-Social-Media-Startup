// Require express and mongoose
const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");

//Environment Variables
const app = express();
const PORT = process.env.PORT || 3001;

//Middleware to parse incoming data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use routes defined in routes.js
app.use(routes);

// Connect to the MongoDB database and start the server
db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
