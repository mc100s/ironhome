const mongoose = require('mongoose');
const User = require('../models/User');
const Home = require('../models/Home');
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

User.deleteMany()
.then(x => {
  console.log("All users were deleted");
  return Home.deleteMany()
})
.then(x => {
  console.log("All homes were deleted");

  let usersToCreate = users.map(user => {
    return {
      firstname: capitalizeFirstLetter(user.name.first),
      lastname: capitalizeFirstLetter(user.name.last),
      email: user.email,
      picture: user.picture.large,
    }
  });
  
  return User.create(usersToCreate)
})
.then(usersFromDb => {
  console.log(usersFromDb.length + " users were created");
  console.log("The id of the first user is", usersFromDb[0]._id);

  let homesToCreate = [];

  for (let i = 0; i < pictures.length; i++) {
    homesToCreate.push({
      picture : pictures[i],
      _owner: usersFromDb[i]._id,
      address: {
        street: users[i].location.street,
        city: users[i].location.city,
        postcode: users[i].location.postcode,
        coordinates: {
          latitude: users[i].location.coordinates.latitude,
          longitude: users[i].location.coordinates.longitude
        }
      }
    })
  }
  return Home.create(homesToCreate)
})
.then(homesFromDb => {
  console.log(homesFromDb.length + " homes were created");
})






