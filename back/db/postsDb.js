const Post = require('../models/Post');

const createPost = async (postData) => {
  try {
    const post = new Post(postData);
    await post.save();
    return post
  } catch (error) {
    throw new Error(error.message)
  }
};
const getPosts = async () => {
  try {
    return await Post.find().sort('-datetime').populate('author');
  } catch (error) {
    throw new Error(error.message)
  }
};

const getPost = async (id) => {
  try {
    return await Post.findById(id)
  } catch (error) {
    throw new Error(error.message)
  }
};
module.exports = {
  createPost,
  getPosts,
  getPost
};