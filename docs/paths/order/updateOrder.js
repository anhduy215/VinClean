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
    // requestBody: {
    //   required: true,
    //   content: {
    //     "application/json": {
    //       schema: {
    //         type: "object",
    //         properties: {
    //           order: {
    //             type: "object",
    //             properties: {
    //               paymentID: {
    //                 type: "string",
    //                 format: "objectId",
    //               },
    //             }
    //           },
    //         },
    //       },
    //       example: {
    //         order: {
    //           paymentID: "123123",
    //         },
    //       },
    //     },
    //   },
    // },
    responses: {
      200: {
        description: "Success",
      },
    },
  },
};