module.exports = {
  get: {
    tags: ["Service"],
    summary: "Return service by ID",
    parameters: [
      {
        in: "path",
        name: "serviceID",
        description: "serviceID",
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
