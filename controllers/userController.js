const User = require("../models/User");

module.exports = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
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
  deleteUser: async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id); // Find and delete the user
      res.json({ message: "User deleted successfully" }); // Send a success message
    } catch (err) {
      res.status(400).json(err); // Handle errors
    }
  },
};
