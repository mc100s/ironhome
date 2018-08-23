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


let apartments = [
  { address: "qstrasse", city: "Berlin", price: 300 },
  { address: "ystrasse", city: "Berlin", price: 800 },
  { address: "estrasse", city: "Berlin", price: 600 },
  { address: "rue a", city: "Paris", price: 700 },
  { address: "rue s", city: "Paris", price: 1100 }
]


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

app.get('/cities/:city', (req,res,next) => {
  let city = req.params.city
  let picture
  switch (city) {
    case "Berlin":
      picture = "https://www.visitberlin.de/system/files/styles/visitberlin_bleed_header_visitberlin_mobile_1x/private/image/iStock_000074120341_Double_DL_PPT_0.jpg?h=a66ba266&itok=2YXS5_33"
      break;
    case "Paris":
      picture = "https://s.abcnews.com/images/International/paris-summer-weather-gty-jef-180727_hpMain_2_16x9_992.jpg"
      break;
    default:
      picture = "http://citydiscovery2.imgix.net/new_york.jpg?w=2100&h=1100&bri=-12&q=30&auto=format&crop=entropy&fit=crop"
      break;
  }
  res.render('city-detail', {
    city: city,
    picture: picture
  });
})

app.get('/search', (req,res,next) => {
  console.log('DEBUG req.query', req.query);

  let city = req.query.city
  let maxPrice = Number(req.query.maxPrice)
  res.render('search', {
    apartments: apartments.filter(a => a.price <= maxPrice && a.city === city)
  });
})


// localhost:3000/a/pancake/crepe/d
app.get('/a/:b/:c/d', (req,res,next) => {
  console.log("The route is executed");
  
  console.log(req.params);
})



app.listen(3000, () => {
  console.log('My first app listening on port 3000!')
});