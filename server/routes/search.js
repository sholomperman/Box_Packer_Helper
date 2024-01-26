// search.js
const express = require('express');
const router = express.Router();
const { pool } = require('../db.js');

router.get('/search/:term', (req, res) => {
  const searchTerm = req.params.term;

  // Assuming 'products' is your table name
  const searchSql = 'SELECT * FROM products WHERE name LIKE ?';
  const searchValue = `%${searchTerm}%`;

  pool.query(searchSql, [searchValue], (err, results) => {
    if (err) {
      console.error('Error searching data:', err);
      res.status(500).send('Error searching data');
    } else {
      console.log('Search results:', results);
      res.status(200).json(results);
    }
  });
});

module.exports = router;
