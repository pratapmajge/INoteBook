const express = require('express')
const router = express.Router()
const fetchuser = require('../middleware/fetchuser')
const User = require('../models/User')
const Notes = require('../models/Note.js');
const { body, validationResult } = require('express-validator');


// route 1 : get all notes using GET "/api/notes/getalluser". login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.error("Error during user creation:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

// route 2 : add new notes using GET "/api/notes/addnote". login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title (min 3 characters)').isLength({ min: 3 }),
    body('description', 'Description must be in atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {

    try {
        const { title, description, tag } = req.body
        //if there are errors, return bad request and errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()

        res.json(savedNote)
    } catch (error) {
        console.error("Error during user creation:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

// route 3 :update existing note  using GET "/api/notes/updatenote". login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body
    try {
        //create new note obj 
        const newNote = {}
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }

        //find note to be updated and update it
        let note = await Notes.findById(req.params.id)
        if (!note) { return res.status(404).send("Not Found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note })
    } catch (error) {
        console.error("Error during user creation:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

// route 4 :delete note  using DELETE "/api/notes/deletenote". login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body

    try {
        //find note to be deleted and delete it
        let note = await Notes.findById(req.params.id)
        if (!note) { return res.status(404).send("Not Found") }

        //allow deletion only if user own the note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({ "success": "Note has benn deleted", note: note })
    } catch (error) {
        console.error("Error during user creation:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

module.exports = router