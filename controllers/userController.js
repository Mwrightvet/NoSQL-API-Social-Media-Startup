const User = require("../models/User");

module.exports = {
  getAllUsers: async (_req, res) => {
    // GET all users
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err); // Handle errors
    }
  },
  //GET a single user by its _id and populated thought and friend data
  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      res.json(user);
    } catch (err) {
      res.status(500).json(err); // Handle errors
    }
  },
  // POST a new user
  createUser: async (req, res) => {
    try {
      const user = await User.create(req.body); // Create a new user
      res.status(201).json(user); // Send the newly created user in the response
    } catch (err) {
      res.status(400).json(err); // Handle validation errors
    }
  },
  //PUT to update a user by its _id
  updateUser: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.json(user); // Send the updated user in the response
    } catch (err) {
      res.status(400).json(err); // Handle validation errors
    }
  },
  // DELETE to remove user by its _id
  deleteUserByID: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id); // Changed to findByIdAndDelete
      if (!user) {
        return res.status(404).json({ message: "user not found" });
      }
      res.json({ message: "User deleted successfully" }); // Send a success message
    } catch (err) {
      res.status(400).json(err); // Handle errors
    }
  },
  // POST to add a new friend to a user's friend list
  addFriend: async (req, res) => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // DELETE to remove a friend from a user's friend list
  deleteFriend: async (req, res) => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
