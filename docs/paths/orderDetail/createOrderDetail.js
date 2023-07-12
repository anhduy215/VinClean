module.exports = {
  post: {
    tags: ["orderDetail"],
    summary: "create orderDetail",
    security: [{ BearerAuth: [] }],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              orderDetail: {
                type: "object",
                properties: {
                  optionID: {
                    type: "string",
                    format: "objectId",
                  },
                  orderID: {
                    type: "string",
                    format: "objectId",
                  },
                  dateBook: {
                    type: "string",
                    format: "date-time",
                    description: "Date of the order in ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ)",
                  },
                  dateEnd: {
                    type: "string",
                    format: "date-time",
                    description: "Date of the order in ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ)",
                  },
                  status: {
                    type: "string",
                  },
                },
              },
            },
          },
          example: {
            orderDetail: {
              optionID: "optionid",
              orderID: "orderid",
              dateBook: "2023-07-13T12:00:00.000Z",
              dateEnd: "2023-07-13T14:00:00.000Z",
              status: "done/notDone",
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