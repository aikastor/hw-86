const User = require('../models/User');
const bcrypt = require("bcrypt");

const createUser = async (userData) => {
  try {
    const user = new User(userData);
    user.generateToken();
    await user.save();

    return user;
  } catch (error) {
    throw new Error(error.message)
  }

};

const loginUser = async (userData) => {
  try {
    const user = await findUser(userData);
    const isMatch = await bcrypt.compare(userData.password, user.password);

    if(!isMatch) {
      throw new Error('Username or password not correct!')
    }
    user.generateToken();
    await user.save();

    return user;

  } catch (error) {
    throw new Error(error.message)
  }
};

const logoutUser = async (token) => {
  try {
    const user = await User.findOne({token});
    user.generateToken();
    await user.save();

  } catch (error) {
    throw new Error(error.message)
  }
};

const findUser = async (userData) => {
  const user = await User.findOne({username: userData.username});

  if(!user) {
    throw new Error('Username or password are incorrect!');
  } else {
    return user;
  }
};


module.exports = {
  createUser,
  loginUser,
  logoutUser
};