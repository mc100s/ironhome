const express = require('express');
const router  = express.Router();
const Home = require("../models/Home")

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/test', (req, res, next) => {
  res.render('test');
});

router.get('/homes', (req, res, next) => {
  Home.find()
  .populate('_owner')
  .then(homes => {
    res.render('homes', {
      homes
    });
  })
});

router.get('/homes/add', (req, res, next) => {
  res.render('add-home');
})

router.post('/homes/add', (req, res, next) => {
  console.log("req.body", req.body);
  let newHome = {
    picture: req.body.picture,
    address: {
      street: req.body.street,
      city: req.body.city,
    }
  }
  Home.create(newHome)
  .then(home => {
    console.log("The home was saved!!!");
    res.redirect('/homes/' + home._id);
  })
})

router.get('/homes/:id', (req, res, next) => {
  res.send('In construction');
})

module.exports = router;
