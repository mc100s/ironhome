const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/test', (req, res, next) => {
  res.render('test');
});

module.exports = router;
