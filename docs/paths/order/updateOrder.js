module.exports = {
  put: {
    tags: ["Order"],
    summary: "update information of order",
    security: [{ BearerAuth: [] }],
    parameters: [
      {
        in: "path",
        name: "orderID",
        description: "orderID",
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