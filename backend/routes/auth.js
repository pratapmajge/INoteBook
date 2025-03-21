const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator')


// Create user using POST "/api/auth"
router.post('/', [
    body('name', ' Enter valid name').isLength({ min: 3 }),
    body('password', ' Enter valid password').isLength({ min: 5 }),
    body('email', ' Enter valid name').isEmail()
], (req, res) => {
    try {
        // console.log(req.body); // Log request body

        // const user = new User(req.body);
        // await user.save(); // Ensure it completes before responding
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        User.create({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email
        }).then(user => res.json({ message: "User created successfully", user }))
        .catch(err => {
            console.log(err)
            res.json({error :"Email already exist" , message: err.message})
        })
        // res.status(201).json({ message: "User created successfully", user });



    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
