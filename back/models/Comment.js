const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  postID: {
    type: Schema.Types.ObjectID,
    ref: 'Post',
    required: true,
  },
  author: {
    type: Schema.Types.ObjectID,
    ref: 'User',
    required: true,
  },
  datetime: {
    type: Date,
    default: Date.now
  },
  text: {
    type: String,
    required: true
  }
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;