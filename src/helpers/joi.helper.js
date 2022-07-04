const Joi = require("joi");

module.exports.validateSchema = (data, schema) => {
  return schema.validate(data);
};
