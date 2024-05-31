const jwt = require('jsonwebtoken');
const secretKey = '631gwdg'; // Utilisez la même clé secrète que lors de la génération du token

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Token non valide.' });
      }

      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ message: 'Authentification requise.' });
  }
};

module.exports = authenticateJWT;