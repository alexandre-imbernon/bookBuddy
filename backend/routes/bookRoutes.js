const express = require('express');
const mongoose = require('mongoose');
const Book = require('../models/bookSchema');
const User = require('../models/userSchema'); // Assurez-vous d'importer le modèle User

const router = express.Router();

// Route pour ajouter un livre
router.post('/addBook', async (req, res) => {
    const { title, author, image, status, pages, category } = req.body;
    try {
        const book = new Book({
            title,
            author,
            image,
            status,
            pages,
            category
        });

        await book.save();
        res.status(201).json({ message: 'Livre ajouté avec succès.' });
    } catch (error) {
        res.status(400).send({ success: false, message: error.message });
    }
});

// Route pour récupérer tous les livres
router.get('/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
});

// Route pour récupérer un livre par ID
router.get('/book/:id', async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'ID de livre invalide.' });
    }
    try {
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: 'Livre non trouvé.' });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
});

// Route pour filtrer une liste de livres
router.get('/book/filter/:filter', async (req, res) => {
    const filter = req.params.filter;
    try {
        let books;
        // Exemple de filtrage par catégorie
        if (filter === 'fiction') {
            books = await Book.find({ category: 'Fiction' });
        } else if (filter === 'dystopian') {
            books = await Book.find({ category: 'Dystopian' });
        } else {
            // Gérer d'autres filtres ici
            return res.status(400).json({ message: 'Filtre non pris en charge.' });
        }
        res.status(200).json(books);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
});

// Route pour mettre à jour l'état d'un livre par ID
router.put('/book/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'ID de livre invalide.' });
    }
    try {
        const book = await Book.findByIdAndUpdate(id, { status }, { new: true });
        if (!book) {
            return res.status(404).json({ message: 'Livre non trouvé.' });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
});

// Route pour ajouter un livre aux favoris d'un utilisateur
router.post('/book/:bookId/favorite/:userId', async (req, res) => {
    const { bookId, userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(bookId) || !mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'ID de livre ou d\'utilisateur invalide.' });
    }
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        if (!user.isLoggedIn) {
            return res.status(403).json({ message: 'Connectez-vous pour ajouter ce livre en favori.' });
        }

        if (user.favorites.includes(bookId)) {
            return res.status(400).json({ message: 'Le livre est déjà dans vos favoris.' });
        }

        user.favorites.push(bookId);
        await user.save();

        res.status(200).json({ message: 'Livre ajouté aux favoris avec succès.' });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
});

module.exports = router;
