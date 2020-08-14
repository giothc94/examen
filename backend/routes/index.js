"use strict";

const router = require("express").Router();
const { UsersService } = require("../service/users");
const { MValidatorSchema } = require("../middlewares/MSchemaValidator");
const { id, userCreate, userUpdate } = require("../lib/schema");
const { ObjectID } = require("mongodb");

module.exports.UsersApi = (app) => {
  app.use("/api/users", router);

  const Service = new UsersService();

  router.get("/list", async (req, res, next) => {
    res.json({
      message: "Users list",
      data: await Service.getUsers(),
    });
  });

  router.post(
    "/create",
    MValidatorSchema(userCreate, "body"),
    async (req, res, next) => {
      let created = Service.createUser(req.body);
      res.json({
        message: "Users created",
        data: created,
      });
    }
  );

  router.put(
    "/update/:id",
    MValidatorSchema(id, "params"),
    MValidatorSchema(userUpdate, "body"),
    async (req, res, next) => {
      let query = { _id: ObjectID(req.params.id) };
      let updated = Service.updateUser(query, req.body);
      res.json({
        message: "Users updated",
        data: updated,
      });
    }
  );

  router.delete(
    "/delete/:id",
    MValidatorSchema(id, "params"),
    async (req, res, next) => {
      let query = { _id: ObjectID(req.params.id) };
      let deleted = Service.deleteUser(query);
      res.json({
        message: "Users deleted",
        data: deleted,
      });
    }
  );
};
