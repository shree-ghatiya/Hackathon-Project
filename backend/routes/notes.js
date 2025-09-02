// backend/routes/notes.js
import express from "express";
import Note from "../models/Note.js";

const router = express.Router();

// GET all notes (with search query optional)
router.get("/", async (req, res) => {
  try {
    const q = req.query.q;
    let notes;
    if (q) {
      notes = await Note.find({ content: { $regex: q, $options: "i" } });
    } else {
      notes = await Note.find();
    }
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create note
router.post("/", async (req, res) => {
  try {
    const note = new Note(req.body);
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update note
router.put("/:id", async (req, res) => {
  try {
    const updated = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE note
router.delete("/:id", async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
