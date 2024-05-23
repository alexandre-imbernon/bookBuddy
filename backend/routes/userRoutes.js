const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/userSchema');

const router = express.Router();

router.post('/addUser', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'Utilisateur déjà inscrit.' });
        }
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

router.put('/user/:id', async (req, res) => {
    const { email, currentPassword, newPassword } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Le mot de passe actuel est incorrect." });
        }

        user.password = newPassword;
        await user.save();

        res.status(200).json({ message: "Mot de passe mis à jour avec succès." });
    } catch (error) {
        res.status(400).send({ success: false, message: error.message });
    }
});

module.exports = router;
