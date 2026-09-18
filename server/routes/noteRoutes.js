const express = require("express");
const router = express.Router();
const Note = require("../models/Note");

// POST /api/notes - Create a new note
router.post("/", async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }
    const newNote = new Note({ title, content });
    const savedNote = await newNote.save();
    return res.status(201).json(savedNote);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET /api/notes - Fetch all notes ordered chronologically descending
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    return res.status(200).json(notes);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

// DELETE /api/notes/:id - Delete a note by _id
router.delete("/:id", async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    return res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
