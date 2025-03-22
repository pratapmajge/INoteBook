const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


// const JWT_SECRET="iampratapmajge$webdev@s/wdev"

// Create user using POST "/api/auth/createuser" // no login required
router.post('/createuser', [
    body('name', ' Enter valid name').isLength({ min: 3 }),
    body('password', ' Enter valid password').isLength({ min: 5 }),
    body('email', ' Enter valid email').isEmail()
], async (req, res) => {
    try {
        // console.log(req.body); // Log request body
        // const user = new User(req.body);
        // await user.save(); // Ensure it completes before responding

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        // check whether same mail exist already
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ error: "User with this email already exist" })
        }

        const salt = await bcrypt.genSalt(10);
        const SecPassword = await bcrypt.hash(req.body.password, salt)

        user = await User.create({
            name: req.body.name,
            password: SecPassword,
            email: req.body.email
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, process.env.JWT_SECRET)
        // console.log(authToken)
        res.json({ authToken })

        // .then(user => res.json({ message: "User created successfully", user }))
        // .catch(err => {
        //     console.log(err)
        //     res.json({error :"Email already exist" , message: err.message})
        // })



    } catch (error) {
        console.error("Error during creating user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// login user using POST "/api/auth/login" // no login required
router.post('/createuser', [
    body('email', ' Enter valid email').isEmail(),
    body('password', ' password cannot be blank').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body
    try {
        let user = User.findOne({ email })
        if (!user) {
            return res.status(400).json({ error: "User with this email does not exists" })
        }
        const passwordcomapre = bcrypt.compare(password, user.password)
        if (!passwordcomapre) {
            return res.status(400).json({ error: "User with this email does not exists" })
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, process.env.JWT_SECRET)
        res.json({ authToken })
    } catch (error) {
        console.error("Error during creating user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }

})

module.exports = router;
