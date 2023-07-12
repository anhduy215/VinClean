module.exports = {
  delete: {
    tags: ["Service"],
    summary: "delete service",
    security: [{ BearerAuth: [] }],
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
