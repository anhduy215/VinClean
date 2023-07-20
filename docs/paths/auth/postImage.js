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
                image: {
                  type: "string",
                  example: "urlFireBase",
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