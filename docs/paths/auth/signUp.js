module.exports = {
  post: {
    tags: ["Auth"],
    requestBody: {
      required: true,
      content: {
        "multipart/form-data": {
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
              image: {
                type: "string",
                format: "binary",
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