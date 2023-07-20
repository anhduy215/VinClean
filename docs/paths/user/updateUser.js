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
        "application/json": {
          schema: {
            type: "object",
            properties: {
              name: {
                type: "string",
                example: "dragoncute",
              },
              phone: {
                type: "string",
                example: "0123456789",
              },
              email:{
                type: "string",
                example: "email@example.com",
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
                example: "url",
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
