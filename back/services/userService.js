const {logoutUser, loginUser, createUser} = require("../db/userDb");

const createUserService =  async (userData) => {
  try {
    return await createUser(userData);
  } catch (error) {
    throw new Error(error)
  }
};

const loginUserService = async (userData) => {
  try {
    return await loginUser(userData)
  } catch (error) {
    throw new Error(error)
  }
};

const logoutUserService = async (token) => {
  try {
    return await logoutUser(token)
  } catch (error) {
    throw new Error(error)
  }
};
module.exports = {
  createUserService,
  loginUserService,
  logoutUserService
};