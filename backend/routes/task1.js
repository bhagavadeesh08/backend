const express = require('express');
const router = express.Router();
const User = require('../schema/task1'); 

router.post('/register', async (req, res) => {
    try {
        const { name, rollno, department, year } = req.body;

        const newUser = new User({
            name,
            rollno,
            department,
            year
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
        
    } catch (err) {
        res.status(500).json({ message: 'Error registering user', error: err.message });
    }
});

router.get('/get', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching users', error: err.message });
    }
});

router.get('/get/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching user', error: err.message });
    }
});

module.exports = router;