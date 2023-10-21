const express = require('express');
const router = express.Router();

// Defining our main routes here
router.get('/', (req, res) => {
  // Handle the home page route
  res.render('index'); 
});

module.exports = router;
