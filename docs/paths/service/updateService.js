module.exports = {
  put: {
    tags: ["Service"],
    summary: "update information of service",
    security: [{ BearerAuth: [] }],
    parameters: [
      {
        in: "path",
        name: "serviceID",
        description: "serviceID",
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
