const express = require('express');
const connectDB = require('./configs/db');
const cors = require('cors');
const app = express();
connectDB();

// parsing des données JSON
app.use(express.json());
app.use(cors());

// Middleware pour définir les routes
app.use('/api', require('./routes/userRoutes'));
app.use('/api', require('./routes/bookRoutes'));

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});