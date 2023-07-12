module.exports = {
  post: {
    tags: ["User"],
    security: [{ BearerAuth: [] }],
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
              email: {
                type: "string",
                example: "dragoncute@gmail.com",
              },
              password: {
                type: "string",
                example: "Dragoncute!123",
              },
              phone: {
                type: "string",
                example: "0123456789"
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
                example: "Hình ảnh"
              },
              status: {
                type: "string",
                example: "active or inactive"
              },
              role: {
                type: 'array',
                items: {
                  type: 'string',
                  enum: ['user', 'admin', 'company'],
                },
                default: ['user'],
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