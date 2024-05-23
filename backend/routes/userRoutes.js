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

// Route pour connecter un utilisateur
router.post('/connexion', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Les informations de connexion sont incorrectes." });
        }

        // Mettre à jour l'état de connexion de l'utilisateur
        user.isLoggedIn = true;
        await user.save();

        res.status(200).json({ message: "Connexion réussie.", user });
    } catch (error) {
        res.status(400).send({ success: false, message: error.message });
    }
});

// Route pour récupérer les informations d'un utilisateur par ID si connecté
router.get('/user/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        if (!user.isLoggedIn) {
            return res.status(403).json({ message: 'Connectez-vous.' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
});

module.exports = router;