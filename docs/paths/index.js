const auth = require("./auth");
const user = require("./user");
const service = require("./service");
const option = require("./option");

module.exports = {
  paths: {
    ...auth,
    ...user,
    ...service,
    ...option,
  },
};
