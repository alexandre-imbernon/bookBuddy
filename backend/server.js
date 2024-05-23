const express = require('express');
const connectDB = require('./configs/db');

const app = express();
connectDB();

// parsing des données JSON
app.use(express.json());

// Middleware pour définir les routes
app.use('/api', require('./routes/userRoutes'));
app.use('/api', require('./routes/bookRoutes'));

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
