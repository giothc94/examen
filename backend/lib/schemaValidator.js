"use strict";

const Joi = require("joi");

module.exports.schemaValidator = function ({ schema, payload }) {
  if (Joi.isSchema(schema)) {
    const { error, value } = schema.validate(payload);
    if (error) {
      let { message } = JSON.parse(JSON.stringify(error)).details.shift();
      return { error: true, message: message };
    }

    return {
      error: false,
      message: "Validated.",
      body: value,
    };
  }

  return { error: true, message: "It is not schema." };
};
