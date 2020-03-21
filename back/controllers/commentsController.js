const {createCommentService, getCommentsService} = require("../services/commentService");

const createComment = async (req, res, next) => {
  try {
    const comment = await createCommentService(req.body);
    res.status(200).send(comment)
  } catch (error) {
    res.status(400).send({error:error.message})
  }
};
const loadComments = async (req, res, next) => {
  try {
    console.log(req.params.id);
    const comments = await getCommentsService(req.params.id);
    res.status(200).send(comments)
  } catch (error) {
    res.status(400).send({error:error.message})
  }
};
module.exports = {
  createComment,
  loadComments
};