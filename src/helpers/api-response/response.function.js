const response = require("./response.format");

const successResponse = (res,  data, message) => {
  return response(res, true, message || "success", 200,  data);
};

const notFoundResponse = (res,  message) => {
  return response(res, false, message || "failure", 404,  null);
};

const internalFailureResponse = (res,  data, message) => {
  return response(res, false, message || "internal server error", 500,  data);
};

const authFailureResponse = (res,  message) => {
  return response(res, false, message || "authentication failure", 401,  null);
};

const conflictResponse = (res,  message) => {
  return response(res, false, message || "conflict occured", 409,  null);
};

const badRequestResponse = (res,  message, data) => {
  return response(res, false, message || "failure", 200,  data);
};

module.exports = {
  successResponse,
  internalFailureResponse,
  badRequestResponse,
  authFailureResponse,
  notFoundResponse,
  conflictResponse
};
