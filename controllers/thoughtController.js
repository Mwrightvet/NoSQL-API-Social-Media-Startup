// Import Thought model
const Thought = require("../models/Thought");

// Controller methods
const thoughtController = {
  getAllThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getThoughtById: async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.id);
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  createThought: async (req, res) => {
    try {
      const thought = await Thought.create(req.body);
      res.status(201).json(thought);
    } catch (err) {
      res.status(400).json(err);
    }
  },
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
  deleteThought: async (req, res) => {
    try {
      await Thought.findByIdAndDelete(req.params.id);
      res.json({ message: "Thought deleted successfully" });
    } catch (err) {
      res.status(400).json(err);
    }
  },
};

module.exports = thoughtController;
