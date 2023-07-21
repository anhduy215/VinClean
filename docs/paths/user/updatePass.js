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
                oldPassword: {
                    type: "string",
                    example: "dragoncute",
                  },
                password: {
                  type: "string",
                  example: "dragoncute",
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
  