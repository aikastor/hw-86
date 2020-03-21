const {createComment, getComments} = require("../db/commentsDb");

const createCommentService = async (commentData) => {
  try {
    return await createComment(commentData)
  } catch (error) {
    throw new Error(error)
  }
};
const getCommentsService = async (postID) => {
  try {
    return await getComments(postID)
  } catch (error) {
    throw new Error(error)
  }
};

module.exports = {
  createCommentService,
  getCommentsService
};
