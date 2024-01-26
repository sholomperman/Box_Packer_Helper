const addRoute = require('./routes/add.js');
const editRoute = require('./routes/edit');
const deleteRoute = require('./routes/delete');
const searchRoute = require('./routes/search');

const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const { pool } = require('./db.js'); 
app.use(express.json());


  app.get('/', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT * FROM products;');
      res.send(rows);
    } catch (error) {
      console.error('Error executing SELECT query:', error);
      res.status(500).send('Error executing query');
    }
  });

  app.use('/', editRoute)
  app.use('/', addRoute)
  app.use('/', deleteRoute) 
  app.use('/', searchRoute)

const port = process.env.PORT || 8081;
app.listen(port, () => console.log(`http://localhost:${port}`));