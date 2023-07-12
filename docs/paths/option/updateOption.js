module.exports = {
  put: {
    tags: ["Option"],
    summary: "update information of Option",
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
                },
              },
            },
          },
          example: {
            option: {
              optionName: "optionName",
              price: 1200000,
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
