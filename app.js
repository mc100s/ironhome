const express = require('express');
const hbs = require('hbs');

let counter = 0;

const app = express();

// Set HBS as our view engine
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

// Register the partials
hbs.registerPartials(__dirname + '/views/partials');


app.use(express.static('public'));


app.get('/', (req, res, next) => {
  counter++;
  let homes = [
    { city: "Berlin", address: "Markgrafendam 28", isWeWork: false },
    { city: "Paris", address: "33 rue La Fayette", isWeWork: true, picture: "https://cdn.wework.com/locations/image/cb34f312-faf2-11e7-989d-1202be33576a/20170405_WeWork_La_Fayette-Paris_Benoit_Florencon-high_08.jpg?auto=compress%2Cformat&w=1200&h=600&fit=crop" },
    { city: "Berlin", address: "Atrium Tower", isWeWork: true, picture: "/images/wework-berlin.jpg" }
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