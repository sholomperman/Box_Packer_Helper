const express = require('express');
const router = express.Router();
const {pool} = require('../db.js'); 

router.put('/edit/:id', (req, res) => {
    const itemId = req.params.id;
    const updatedData = req.body;
    const { name, box, count_per_box, weight } = updatedData;
  
    const sql = 'UPDATE products SET name=?, box=?, count_per_box=?, weight=? WHERE id=?';
    const values = [name, box, count_per_box, weight, itemId];
  
    pool.query(sql, values, (err, results) => {
      if (err) {
        console.error('Error updating data:', err);
        res.status(500).send('Error updating data');
      } else {
        console.log('Data updated successfully');
        res.status(200).send('Data updated successfully');
      }
    });
  });

  module.exports = router;