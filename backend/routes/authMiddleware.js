const jwt = require('jsonwebtoken');
const secretKey = '631gwdg'; // Utilisez la même clé secrète que lors de la génération du token

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Accès refusé. Aucun token fourni.' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded; // Ajoute les informations décodées du token à la requête
    next();
  } catch (error) {
    res.status(400).json({ message: 'Token invalide.' });
  }
};

module.exports = authMiddleware;
