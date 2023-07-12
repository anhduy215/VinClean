const getAllOption = require("./allOptions");
const getOptionById = require("./getOptionById");
const addOption = require("./addOption");
const updateOption = require("./updateOption");
const deleteOption = require("./deleteOption");

module.exports = {
  "/option": {
    ...getAllOption,
    ...addOption,
  },
  "/option/{optionID}": {
    ...getOptionById,
    ...updateOption,
    ...deleteOption,
  },
};