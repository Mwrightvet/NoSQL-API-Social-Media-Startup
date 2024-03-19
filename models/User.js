// Import Mongoose library
const mongoose = require("mongoose");

// Define user schema
const userSchema = new mongoose.Schema({
  // Username field
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  // Email field
  email: {
    type: String,
    required: true,
    unique: true,
    // Validate email format using regex
    match: [/.+@.+\..+/, "Please enter a valid email"],
  },
  // Array of thoughts associated with the user
  thoughts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thought",
    },
  ],
  // Array of user IDs referencing friends
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

// Create User model
const User = mongoose.model("User", userSchema);

// Export User model
module.exports = User;
