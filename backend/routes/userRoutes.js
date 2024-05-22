const express = require('express');
const User = require('../models/userSchema');

const router = express.Router();

router.post('/addUser', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if(user) { return(res.status(400).json({ message: 'Utilisateur déjà inscrit.' }))};
        user = new User({
            username,
            email,
            password
        });

        await user.save();
        res.status(201).json({ message: 'Utilisateur inscrit avec succès.' });
    } catch (error) {
        res.status(400).send({ success: false, message: error.message });
    }
});

module.exports = router;