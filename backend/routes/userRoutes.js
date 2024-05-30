const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/userSchema');

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

        user.isLoggedIn = true;
        await user.save();

        res.status(200).json({ message: 'Connexion réussie.', user });
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

// Route pour gérer la gamification (ERREUR CONNEXION REFUSEE, VOIR SI MARCHE AVEC TOKEN)
router.post('/reward/:parametre', async (req, res) => {
    const { parametre } = req.params;
    const { userId } = req.body;
    // const token = localStorage.getItem('token');

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'ID d\'utilisateur invalide.' });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        if (!user.isLoggedIn) {
            return res.status(403).json({ message: 'Connectez-vous pour recevoir des récompenses.' });
        }

        const favoritesResponse = await fetch(`/api/user/${userId}`);
        const favorites = favoritesResponse.data;

        const favoriteCount = favorites.length;

        if (parametre === 'addFavorite') {
            user.rewards.push({ type: 'addFavorite', message: 'Récompense pour avoir ajouté un livre en favori.' });

            const badges = [];
            if (favoriteCount === 1) {
                badges.push('Premier favori');
            }

            badges.forEach(badge => {
                if (!user.badges.includes(badge)) {
                    user.badges.push(badge);
                    user.rewards.push({ type: 'badge', message: `Récompense pour avoir atteint ${badge}.` });
                }
            });
        } else if (parametre === 'finishBook') {
            user.rewards.push({ type: 'finishBook', message: 'Récompense pour avoir terminé un livre.' });
        } else if (parametre === 'finishThreeBooks') {
            user.rewards.push({ type: 'finishThreeBooks', message: 'Récompense pour avoir terminé trois livres.' });
        } else {
            return res.status(400).json({ message: 'Paramètre de récompense non pris en charge.' });
        }

        await user.save();
        res.status(200).json({ message: 'Récompense ajoutée avec succès.', rewards: user.rewards, badges: user.badges });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
});

module.exports = router;