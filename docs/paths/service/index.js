const getAllService = require("./getAllService");
const getServiceById = require("./getServiceById");
const addService = require("./addService");
const updateService = require("./updateService");
const deleteService = require("./deleteService");

module.exports = {
  "/service": {
    ...getAllService,
    ...addService,
  },
  "/service/{serviceID}": {
    ...getServiceById,
    ...updateService,
    ...deleteService,
  },
};
