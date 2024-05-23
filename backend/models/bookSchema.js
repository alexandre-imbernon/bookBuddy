const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    id: { type: Number, default: Date.now, unique: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    image: { type: String, required: true },
    status: { type: String, required: true },
    pages: { type: Number, required: true },
    category: { type: String, required: true }
}, { versionKey: false });

module.exports = mongoose.model('Book', bookSchema, 'Books');
