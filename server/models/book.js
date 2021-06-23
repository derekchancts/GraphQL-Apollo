const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  name: String,
  genre: String,
  authorId: String
});

// model = a collection in MongoDB
// 'Book' = the name of the collection
module.exports = mongoose.model('Book', bookSchema);