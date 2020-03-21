const {createPost, getPosts, getPost} = require("../db/postsDb");

const createPostService = async (postData) => {
  try {
    return await createPost(postData)
  } catch (error) {
    throw new Error(error)
  }
};
const getPostsService = async () => {
  try {
    return await getPosts()
  } catch (error) {
    throw new Error(error)
  }
};
const getPostService = async (id) => {
  try {
    return await getPost(id);
  } catch (error) {
    throw new Error(error)
  }
};
module.exports = {
  createPostService,
  getPostsService,
  getPostService
};