module.exports = {
  put: {
    tags: ["Service"],
    summary: "update information of service",
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
                  description: {
                    type: "string",
                  },
                },
              },
            },
          },
          example: {
            service: {
              serviceName: "serviceName",
              description: "description",
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
