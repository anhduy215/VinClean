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
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              order: {
                type: "object",
                properties: {
                  status: {
                    type: "string",
                  },
                },
              },
            },
          },
          example: {
            order: {
              status: "not paid",
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: "Success",
      },
    },
  },
};