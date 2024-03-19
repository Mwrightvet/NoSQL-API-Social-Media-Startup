// Import Mongoose library
const mongoose = require("mongoose");

// Define thought schema
const thoughtSchema = new mongoose.Schema({
  // Text of the thought
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  // Creation timestamp
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // Username of the thought creator
  username: {
    type: String,
    required: true,
  },
  // Array of reactions associated with the thought
  reactions: [
    {
      // ID of the reaction
      reactionId: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
      },
      // Body of the reaction
      reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
      },
      // Username of the user who reacted
      username: {
        type: String,
        required: true,
      },
      // Creation timestamp of the reaction
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

// Create Thought model
const Thought = mongoose.model("Thought", thoughtSchema);

// Export Thought model
module.exports = Thought;
