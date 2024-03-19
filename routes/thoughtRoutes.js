// Import Express router
const router = require("express").Router();

// Import thought controller methods
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
} = require("../controllers/thoughtController");

// Define routes for handling CRUD operations on thoughts
router
  .route("/")
  .get(getAllThoughts) // Route to retrieve all thoughts
  .post(createThought); // Route to create a new thought

router
  .route("/:id")
  .get(getThoughtById) // Route to retrieve a thought by its ID
  .put(updateThought) // Route to update a thought by its ID
  .delete(deleteThought); // Route to delete a thought by its ID

// Export router
module.exports = router;
