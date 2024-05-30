const express = require('express');
const mongoose = require('mongoose');
const Book = require('../models/bookSchema');
const User = require('../models/userSchema');
const authenticateJWT = require('../configs/authenticateJWT');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Route pour ajouter un livre
router.post('/addBook', async (req, res) => {
    const { title, author, image, status, pages, category } = req.body;
    try {
        const existingBook = await Book.findOne({ title, author });
        if (existingBook) {
            return res.status(400).json({ message: 'Le livre existe déjà.' });
        }

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
        if (filter === 'fiction') {
            books = await Book.find({ category: 'Fiction' });
        } else if (filter === 'dystopian') {
            books = await Book.find({ category: 'Dystopian' });
        } else {
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

// Route pour ajouter un livre en favori
router.post('/book/:id', authenticateJWT, async (req, res) => {
    const bookId = req.params.id;
    const userId = req.user.userId;
    console.log(userId);

    try {
        // Vérifier si le livre existe
        const book = await Book.findById(bookId);
        if (!book) {
            return(res.status(404).json({ message: 'Livre non trouvé.' }));
        }

        // Vérifier si l'utilisateur existe et s'il est connecté
        const user = await User.findById(userId);
        if (!user || !user.isLoggedIn) {
            return(res.status(401).json({ message: 'Utilisateur non authentifié.' }));
        }

        // Vérifier si le livre est déjà dans les favoris de l'utilisateur
        if (user.favorites.includes(bookId)) {
            return(res.status(400).json({ message: 'Ce livre est déjà dans les favoris de l\'utilisateur.' }));
        }

        // Ajouter le livre aux favoris de l'utilisateur
        user.favorites.push(bookId);
        await user.save();

        res.status(200).json({ message: 'Livre ajouté aux favoris avec succès.' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de l\'ajout du livre aux favoris.', error });
    }
});

// Route pour supprimer un livre des favoris d'un utilisateur
router.delete('/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID de livre invalide.' });
    }

    const book = await Book.findByIdAndDelete(id);

    if (!book) {
      return res.status(404).json({ message: 'Livre non trouvé.' });
    }

    res.status(200).json({ message: 'Livre supprimé avec succès.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du livre', error });
  }
});



router.get('/favorites', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).populate('favorites');

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        res.status(200).json(user.favorites);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des favoris.', error });
    }
});

module.exports = router;