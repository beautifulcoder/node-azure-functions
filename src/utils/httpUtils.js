const createJsonResponse = (status, body = null) => {
  const response = {
    status,
    headers: { "Content-Type": "application/json" }
  };

  if (body !== null) {
    response.body = JSON.stringify(body);
  }

  return response;
};

const handleError = (context, message, error) => {
  context.error(message, error);

  return createJsonResponse(500, { error: "Internal server error" });
};

module.exports = {
  createJsonResponse,
  handleError
};
