const express = require('express')
const router = express.Router()
const fetchuser = require('../middleware/fetchuser')
const User = require('../models/User')
const Notes = require('../models/Note.js');
const { body, validationResult } = require('express-validator');


// route 1 : get all notes using GET "/api/auth/getalluser". login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try{
    const notes = await Notes.find({ user: req.user.id })
    res.json(notes)
    }catch(error){
        console.error("Error during user creation:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

// route 2 : add new notes using GET "/api/auth/addnote". login required
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
module.exports = router