module.exports = {
  get: {
    tags: ["Option"],
    summary: "Return option by ID",
    parameters: [
      {
        in: "path",
        name: "optionID",
        description: "optionID",
        schema: {
          type: "String",
          format: "objectId",
        },
      },
    ],
    responses: {
      200: {
        description: "Success",
      },
    },
  },
};
