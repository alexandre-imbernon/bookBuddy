const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/userSchema');
const jwt = require('jsonwebtoken');
const secretKey = '631gwdg';

const router = express.Router();

// Route pour ajouter un utilisateur
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

// Route pour mettre à jour le mot de passe
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

// Route pour se connecter
router.post('/connexion', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Mot de passe incorrect.' });
        }

        const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' }); // Le token expire après 1 heure

        res.status(200).json({ message: 'Connexion réussie.', token, user });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
});

// Route pour récupérer les informations d'un utilisateur par ID
router.get('/user/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('favorites', 'title'); // Populer les favoris avec uniquement le champ title
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        if (!user.isLoggedIn) {
            return res.status(403).json({ message: 'Connectez-vous pour voir ces informations.' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
});

module.exports = router;