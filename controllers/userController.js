const User = require("../models/User");

module.exports = {
  getAllUsers: async (_req, res) => {
    // Find all users
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err); // Handle errors
    }
  },
  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      res.json(user);
    } catch (err) {
      res.status(500).json(err); // Handle errors
    }
  },
  createUser: async (req, res) => {
    try {
      const user = await User.create(req.body); // Create a new user
      res.status(201).json(user); // Send the newly created user in the response
    } catch (err) {
      res.status(400).json(err); // Handle validation errors
    }
  },
  updateUser: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      }); // Update the user
      res.json(user); // Send the updated user in the response
    } catch (err) {
      res.status(400).json(err); // Handle validation errors
    }
  },
  deleteUserByID: async (req, res) => {
    //changed to function
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

  deleteFriend: async (req, res) => {
    // changed this to async and await and to use pull for delete just like update
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
