module.exports = {
  put: {
    tags: ["User"],
    parameters: [
      {
        in: "path",
        name: "userId",
        description: "User ID",
        schema: {
          type: "string",
          format: "ObjectId",
        },
      },
    ],
    requestBody: {
      required: true,
      content: {
        "multipart/form-data": {
          schema: {
            type: "object",
            properties: {
              name: {
                type: "string",
                example: "dragoncute",
              },
              password: {
                type: "string",
                example: "Dragoncute!123",
              },
              phone: {
                type: "string",
                example: "0123456789",
              },
              block: {
                type: "string",
                example: "3A"
              },
              room: {
                type: "string",
                example: "012"
              },
              image: {
                type: "string",
                format: "binary",
              },
              status: {
                type: "string",
                example: "active or inactive",
              },
              role: {
                type: "array",
                items: {
                  type: "string",
                  enum: ["user", "admin", "company"],
                },
                default: ["user"],
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
