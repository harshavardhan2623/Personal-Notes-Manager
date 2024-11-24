const express = require("express");
const Note = require("../models/Note");
const router = express.Router();

// Create a note
router.post("/", async (req, res) => {
    const { title, description, category } = req.body;
    try {
        const note = new Note({ title, description, category });
        await note.save();
        res.status(201).json(note);
    } catch (err) {
        res.status(400).json({ error: "Invalid data" });
    }
});

// Get all notes
router.get("/", async (req, res) => {
    const { category, search } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (search) filter.title = new RegExp(search, "i");

    try {
        const notes = await Note.find(filter).sort({ created_at: -1 });
        res.json(notes);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

// Update a note
router.put("/:id", async (req, res) => {
    const { title, description, category, completed } = req.body;
    try {
        const note = await Note.findByIdAndUpdate(
            req.params.id,
            { title, description, category, completed, updated_at: Date.now() },
            { new: true }
        );
        if (!note) return res.status(404).json({ error: "Note not found" });
        res.json(note);
    } catch (err) {
        res.status(400).json({ error: "Invalid data" });
    }
});

// Delete a note
router.delete("/:id", async (req, res) => {
    try {
        const note = await Note.findByIdAndDelete(req.params.id);
        if (!note) return res.status(404).json({ error: "Note not found" });
        res.json({ message: "Note deleted" });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
