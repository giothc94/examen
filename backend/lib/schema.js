"use strict";

const Joi = require("joi");

const id = Joi.object({
  id: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .empty()
    .required()
    .messages({
      "string.base": `{#label} debe ser un texto`,
      "string.pattern.base": `{#label} no tiene el formato adecuado`,
      "string.empty": `{#label} no puede estar vacio`,
      "any.required": `{#label} es un campo requerido`,
    }),
});

const userCreate = Joi.object({
  ci: Joi.string().empty().min(10).max(13).trim().pattern(/^[0-9]+$/).required(),
  firstName: Joi.string().empty().min(5).max(50).trim().lowercase().required(),
  lastName: Joi.string().empty().min(5).max(50).trim().lowercase().required(),
  email: Joi.string().empty().email().trim().required(),
  tipo: Joi.string()
    .max(100)
    .trim()
    .valid("administrador")
    .valid("estudiante")
    .valid("bibliotecario")
    .required(),
  clave: Joi.string().min(8).required(),
});

const userUpdate = Joi.object({
  ci: Joi.string().empty().min(10).max(13).trim().optional(),
  firstName: Joi.string().empty().min(5).max(50).trim().lowercase().optional(),
  lastName: Joi.string().empty().min(5).max(50).trim().lowercase().optional(),
  email: Joi.string().empty().email().trim().optional(),
  tipo: Joi.string().max(100).trim().invalid("super-root").optional(),
  clave: Joi.string().min(8).optional(),
});

module.exports = {
  id,
  userCreate,
  userUpdate
};
