const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const homeSchema = new Schema({
  picture : String,
  _owner: { type: Schema.Types.ObjectId, ref: 'User' },
  address: {
    street: String,
    city: String,
    postcode: Number,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  }
});

const Home = mongoose.model('Home', homeSchema);
module.exports = Home;