const getAllUser = require("./getAllUser");
const getUserById = require("./getUserById");
const deleteUser = require("./deleteUserById");
const updateUser = require("./updateUser");
const createUser = require("./createUser");
const getUserBySignedIn = require("./getUserBySignedIn");
const updatePassword = require("./updatePass");
module.exports = {
  "/users": {
    ...getAllUser,
  },

  "/user": {
    ...getUserBySignedIn,
  },

  "/user/create":{
    ...createUser,
  },

  "/user/{userId}": {
    ...getUserById,
    ...deleteUser,
    ...updateUser,
  },
  "/user/changePassword/{userId}": {
    ...updatePassword
  },
};
