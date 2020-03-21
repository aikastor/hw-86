const path = require('path');
const multer = require('multer');
const nanoid = require('nanoid');
const config = require('../config');
const {createPostService, getPostsService,getPostService} = require("../services/postService");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage }).single('image');

const addPost = async (req, res, next) => {

  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
    } else if (err) {
    }

    const postData = req.body;
    if(req.file) {
      postData.image = req.file.filename;
    }
    console.log(req.body);
    try {
      const post = await createPostService(postData);
      res.status(200).send(post)
    } catch (error) {
      res.status(400).send({error:error.message})
    }
  });

};
const getPosts = async (req, res, next) => {
  try {
    const posts = await getPostsService();
    res.status(200).send(posts)
  } catch (error) {
    res.status(400).send({error:error.message})
  }
};
const getPost = async (req, res, next) => {
  try {
    const post = await getPostService(req.params.id);
    res.status(200).send(post)
  } catch (error) {
    res.status(400).send({error:error.message})
  }
};

module.exports = {
  addPost,
  getPosts,
  getPost
};