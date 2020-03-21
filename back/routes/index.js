const express = require('express');
const authMiddleware = require('../middlewares/auth');
const {createComment, loadComments} = require("../controllers/commentsController");
const {logoutUser, loginUser, postUser} = require("../controllers/usersController");
const {addPost, getPosts, getPost} = require("../controllers/postsController");


const router = express.Router();

router.post('/users', postUser);
router.post('/users/sessions', loginUser);
router.delete('/users/sessions', logoutUser);

router.post('/posts', authMiddleware, addPost);
router.get('/posts', getPosts);
router.get('/posts/:id', getPost);

router.post('/comments', authMiddleware, createComment);
router.get('/comments/:id', loadComments);

module.exports = router;
