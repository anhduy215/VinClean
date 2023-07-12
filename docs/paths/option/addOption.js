module.exports = {
  post: {
    tags: ["Option"],
    summary: "create option",
    security: [{ BearerAuth: [] }],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              option: {
                type: "object",
                properties: {
                  optionName: {
                    type: "string",
                  },
                  price: {
                    type: "number",
                  },
                  serviceID: {
                    type: "string",
                    format: "objectId",
                  },
                },
              },
            },
          },
          example: {
            option: {
              optionName: "optionName",
              price: 1200000,
              serviceID:"qreswrdrf",
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
