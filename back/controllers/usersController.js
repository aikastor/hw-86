const {logoutUserService} = require("../services/userService");
const {loginUserService} = require("../services/userService");
const {createUserService} = require("../services/userService");


const postUser = async (req, res, next) => {
  const userData = req.body;
  try {
    const user = await createUserService(userData);
    res.status(200).send(user)
  } catch (error){
    console.log(error.message);
    res.status(400).send({error:error.message})
  }
};

const loginUser = async (req, res, next) => {
  const userData = req.body;

  try {
    const user = await loginUserService(userData);
    res.status(200).send(user)
  } catch (error) {
    res.status(400).send({error:error.message})
  }
};

const logoutUser = async (req, res,next) => {
  const success = {message: 'Success'};
  try {
    const token = req.get('Authorization').split(' ')[1];
    await logoutUserService(token);
    res.status(200).send(success)
  } catch (error) {
    res.status(200).send({success})
  }
};

module.exports = {
  postUser,
  loginUser,
  logoutUser,
};