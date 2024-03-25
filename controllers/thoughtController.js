// Import Thought model
const Thought = require("../models/Thought");

// Controller methods
const thoughtController = {
  // GET to get all thoughts
  getAllThoughts: async (_req, res) => {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // GET to get a single thought by its _id
  getThoughtById: async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.id);
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // POST to create a new thought
  createThought: async (req, res) => {
    try {
      const thought = await Thought.create(req.body);
      res.status(201).json(thought);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  //PUT to update a thought by its _id
  updateThought: async (req, res) => {
    try {
      const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.json(thought);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  //DELETE to remove a thought by its _id
  deleteThought: async (req, res) => {
    try {
      await Thought.findByIdAndDelete(req.params.id);
      res.json({ message: "Thought deleted successfully" });
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // POST to create a reaction stored in a single thought's reactions array field
  async createReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );
      thought
        ? res.json(thought)
        : res.status(404).json({ message: "Reaction not found" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //  DELETE to pull and remove a reaction by the reaction's reactionId value
  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      thought
        ? res.json(thought)
        : res.status(404).json({ message: "Thought not found" });
    } catch (err) {
      res.status(500).json(reportError);
    }
  },
};

module.exports = thoughtController;
