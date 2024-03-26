// routes/userRoutes.js

const router = require("express").Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUserByID,
  addFriend,
} = require("../controllers/userController");

// Routes
router.route("/").get(getAllUsers).post(createUser);

router.route("/:id").get(getUserById).put(updateUser).delete(deleteUserByID);

router.route("/:userId/friends/:friendId").post(addFriend);

module.exports = router;
