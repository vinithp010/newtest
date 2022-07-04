module.exports = (res, isSuccess, message, data) => {
  return res.status(code).send({
    status: isSuccess,
    message,
    body: data
  });
};
