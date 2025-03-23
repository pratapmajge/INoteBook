const express = require('express')
const router = express.Router()
const fetchuser = require('../middleware/fetchuser')
const User = require('../models/User')
const Notes = require('../models/Notes.js');  
const { body, validationResult } = require('express-validator');


// route 1 : get all notes using GET "/api/auth/getalluser". login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    const notes=await Notes.find({user : req.user.id})
    res.json(notes)
})

// route 2 : add new notes using GET "/api/auth/addnote". login required
router.post('/addnote', fetchuser, async (req, res) => {
    body('name', 'Enter a valid name (min 3 characters)').isLength({ min: 3 }),
    body('password', 'Enter a valid password (min 5 characters)').isLength({ min: 5 }),
    body('email', 'Enter a valid email').isEmail()
    res.json(notes)
})
module.exports = router