const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Create user using POST "/api/auth"
router.post('/', async (req, res) => {
    try {
        console.log(req.body); // Log request body

        const user = new User(req.body);
        await user.save(); // Ensure it completes before responding

        res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
