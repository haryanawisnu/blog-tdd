var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var blogSchema = new Schema({
  blog: {
    title: String,
    category: String,
    description: String,
    published: Date,
    website: String,
    updated: Date
  },
  author: {
    name: String,
    active: Date,
    address: String,
    phone: String,
    email: String
  }
});
var Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
