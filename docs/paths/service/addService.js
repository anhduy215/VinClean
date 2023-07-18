module.exports = {
  post: {
    tags: ["Service"],
    summary: "create Service",
    security: [{ BearerAuth: [] }],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              service: {
                type: "object",
                properties: {
                  serviceName: {
                    type: "string",
                  },
                },
              },
            },
          },
          example: {
            service: {
              serviceName: "serviceName",
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