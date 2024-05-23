const express = require('express');
const Book = require('../models/bookSchema');

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
    try {
        const book = await Book.findById(req.params.id);
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

module.exports = router;
