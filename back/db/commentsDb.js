const Comment = require('../models/Comment');

const createComment = async (commentData) => {
  try {
    const comment = new Comment(commentData);
    await comment.save();
    return comment
  } catch (error) {
    throw new Error(error.message)
  }
};
const getComments = async (postID) => {
  try {
    return await Comment.find({postID}).populate('author');
  } catch (error) {
    throw new Error(error.message)
  }
};
module.exports = {
  createComment,
  getComments,
};