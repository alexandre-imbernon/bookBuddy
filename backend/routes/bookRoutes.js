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

module.exports = router;
