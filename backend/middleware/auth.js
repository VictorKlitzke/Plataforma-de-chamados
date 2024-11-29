const jwt = require('jsonwebtoken');
const pool = require('../database/index');

module.exports = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    pool.query('SELECT * FROM users WHERE id = ?', [decoded.userId], (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Erro ao consultar o banco de dados' });
      }

      if (results.length === 0) {
        return res.status(401).json({ message: 'Usuário não encontrado' });
      }

      req.user = results[0];
      next(); 
    });

  } catch (error) {
    console.error(error);
  }
}