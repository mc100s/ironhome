const express = require('express');

let counter = 0;

const app = express();

// Set HBS as our view engine
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

app.use(express.static('public'));


app.get('/', (req, res, next) => {
  counter++;
  let homes = [
    { city: "Berlin", address: "Markgrafendam 28", isWeWork: false },
    { city: "Paris", address: "33 rue La Fayette", isWeWork: true },
    { city: "Berlin", address: "Atrium Tower", isWeWork: true }
  ]
  res.render('index', {
    counter: counter,
    homes: homes
  });
});

app.get('/best-homes', (req, res, next) => {
  res.render('homes');
});

app.get('/login', (req,res,next) => {
  res.render('login');
})


app.listen(3000, () => {
  console.log('My first app listening on port 3000!')
});