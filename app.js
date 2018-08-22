const express = require('express');

const app = express();

// our first Route
app.get('/', (request, response, next) => {
  console.log(request);
  response.send('<h1>Welcome Ironhomers. :)</h1>');
});

app.get('/best-homes', (request, response, next) => {
  console.log(request);
  response.send('<h1>Best homes</h1><p>WeWork</p>');
});

app.get('/logout', (request, response, next) => {
  response.send('<h1>Logout</h1>');
});

app.listen(3000, () => {
  console.log('My first app listening on port 3000!')
});