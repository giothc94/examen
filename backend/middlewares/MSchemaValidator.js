"use strict";

// imports
const { schemaValidator } = require("../lib/schemaValidator");

/**
 * @author Gabriel Costta
 * @description Middleware para la validacion de schemas
 *
 */
module.exports.MValidatorSchema = (schema, check = "body") => (
  req,
  res,
  next
) => {
  let { error, message, body } = schemaValidator({
    schema: schema,
    payload: req[check],
  });
  if (error)
    next({
      error: true,
      message: message,
      body: {},
      code: 202,
    });
  else {
    req[check] = body;
    next();
  }
};
