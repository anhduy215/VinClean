module.exports = {
  post: {
    tags: ["Order"],
    summary: "create order",
    security: [{ BearerAuth: [] }],
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
    //               // date: {
    //               //   type: "string",
    //               //   format: "date-time",
    //               //   description: "Date of the order in ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ)",
    //               // },
    //             },
    //           },
    //         },
    //       },
    //       example: {
    //         order: {
    //           paymentID: "id123123123",
    //           // date: "2023-10-13T00:00:00.000Z",
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