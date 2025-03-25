const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')

//Route 1 : Create user using POST "/api/auth/createuser" – No authentication required
router.post('/createuser', [
    body('name', 'Enter a valid name (min 3 characters)').isLength({ min: 3 }),
    body('password', 'Enter a valid password (min 5 characters)').isLength({ min: 5 }),
    body('email', 'Enter a valid email').isEmail()
], async (req, res) => {
    try {
        // Validate request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Check if user with the same email already exists
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "User with this email already exists" });
        }

        // Hash the password before storing
        const salt = await bcrypt.genSalt(10);
        const SecPassword = await bcrypt.hash(req.body.password, salt);

        // Create new user
        user = await User.create({
            name: req.body.name,
            password: SecPassword,
            email: req.body.email
        });

        // Generate authentication token
        const data = { user: { id: user.id } };
        const authToken = jwt.sign(data, process.env.JWT_SECRET);
        res.json({ authToken });

    } catch (error) {
        console.error("Error during user creation:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//Route 2: Login user using POST "/api/auth/login" – No authentication required
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        // Check if user exists
        let user = await User.findOne({ email });
        // let user = await User.findOne({ email });
        console.log("User Found:", user);

        if (!user) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // Compare provided password with stored hashed password
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // Generate authentication token
        const data = { user: { id: user.id } };
        const authToken = jwt.sign(data, process.env.JWT_SECRET);
        res.json({ authToken });

    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//Route 3: get user details using POST "/api/auth/getuser" – login required

router.post('/getuser', fetchuser, async (req, res) => {
    try {
        userId = req.user.id
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})


module.exports = router;
