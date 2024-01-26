const express = require('express');
const router = express.Router();
const {pool} = require('../db.js'); 

router.post('/products', async (req, res) => {
    try {
      const { name, box, count_per_box, weight } = req.body;

      if (!name || !box || !count_per_box) {
        return res.status(400).json({ message: 'Please provide name, box, and count_per_box' });
      }

      const result = await pool.query(
        'INSERT INTO products (name, box, count_per_box, weight) VALUES (?, ?, ?, ?)',
        [name, box, count_per_box, weight || null]
      );
      res.status(201).json({ message: 'Product added successfully', productId: result.insertId });
    } catch (error) {
      console.error('Error adding new product:', error);
      res.status(500).json({ message: 'Error adding new product' });
    }
  });

  module.exports = router;