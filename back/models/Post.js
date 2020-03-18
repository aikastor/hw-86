const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  author: {
    type: Schema.Types.ObjectID,
    ref: 'User',
    required: true,
  },
  datetime: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    required: true,
  },
  description : String,
  image: String,
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
