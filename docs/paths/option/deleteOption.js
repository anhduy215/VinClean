module.exports = {
  delete: {
    tags: ["Option"],
    summary: "delete option",
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
