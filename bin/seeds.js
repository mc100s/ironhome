const mongoose = require('mongoose');
const User = require('../models/User');
const users = require('../data/users');
const pictures = require('../data/pictures');

mongoose.Promise = Promise;
mongoose
  .connect('mongodb://localhost/ironhome', {useMongoClient: true})
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

let usersToCreate = users.map(user => {
  return {
    firstname: capitalizeFirstLetter(user.name.first),
    lastname: capitalizeFirstLetter(user.name.last),
    email: user.email,
    picture: user.picture.large,
  }
});

console.log(usersToCreate);

User.create(usersToCreate)
.then(usersFromDb => {
  console.log(usersFromDb.length + " users were created");
})
/*
[
  {
    firstname: "Ralf-dieter",
    lastname: "Vogel",
    email: "ralf-dieter.vogel@example.com",
    picture: "https://randomuser.me/api/portraits/men/28.jpg"
  },
  { ... },
  { ... },
  { ... },
  { ... },
  ...
]
*/

// User.create(usersToCreate)
