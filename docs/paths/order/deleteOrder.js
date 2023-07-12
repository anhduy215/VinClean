module.exports = {
    delete: {
      tags: ["Order"],
      summary: "delete order",
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