// delete.js
const express = require('express');
const router = express.Router();
const { pool } = require('../db.js');

router.delete('/delete/:id', (req, res) => {
  const itemId = req.params.id;

  // Assuming 'products' is your table name
  const deleteSql = 'DELETE FROM products WHERE id=?';
  pool.query(deleteSql, [itemId], (err, results) => {
    if (err) {
      console.error('Error deleting data:', err);
      res.status(500).send('Error deleting data');
    } else {
      if (results.affectedRows === 0) {
        // If no rows were affected, the item with the given id was not found
        res.status(404).send('Item not found');
      } else {
        console.log('Data deleted successfully');
        res.status(200).send('Data deleted successfully');
      }
    }
  });
});

module.exports = router;
