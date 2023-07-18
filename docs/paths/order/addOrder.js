module.exports = {
  post: {
    tags: ["Order"],
    summary: "create order",
    security: [{ BearerAuth: [] }],
    responses: {
      200: {
        description: "Success",
      },
    },
  },
};