const auth = require("./auth");
const user = require("./user");

module.exports = {
  paths: {
    ...auth,
    ...user,
  },
};
