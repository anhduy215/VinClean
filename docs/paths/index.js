const auth = require("./auth");
const user = require("./user");
const service = require("./service");
const option = require("./option");
const order = require("./order");
const orderDetail = require("./orderDetail");

module.exports = {
  paths: {
    ...auth,
    ...user,
    ...service,
    ...option,
    ...order,
    ...orderDetail,
  },
};
