const signIn = require("./signIn");
const signUp = require("./signUp");
const signOut = require("./signOut");
const verifyEmail = require("./verifyEmail");
const upload = require("./postImage");
module.exports = {
  "/signIn": {
    ...signIn,
  },
  "/signUp": {
    ...signUp,
  },
  "/signOut": {
    ...signOut,
  },
  "/verifyEmail": {
    ...verifyEmail,
  },
  "/upload": {
    ...upload,
  },
};
