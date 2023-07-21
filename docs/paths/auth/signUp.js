module.exports = {
  post: {
    tags: ["Auth"],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              name: {
                type: "string",
                example: "TrinhBinhMinh",
              },
              username: {
                type: "string",
                example: "dragoncute",
              },
              password: {
                type: "string",
                example: "Dragoncute!123",
              },
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