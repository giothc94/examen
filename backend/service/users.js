"use strict";

const { DocumentDao } = require("../lib/DocumentDao");
const { config } = require("../config/index");

module.exports.UsersService = class {
  #db;

  constructor() {
    this.#db = new DocumentDao(config.mongoCollectionUsuarios);
  }

  async getUsers() {
    return await this.#db.getAll({});
  }

  async getUser(query, fields) {
    return await this.#db.get({ query: query, fields: fields });
  }

  async createUser(data) {
    return await this.#db.create(data);
  }

  async updateUser(query, data) {
    return await this.#db.update(query, { $set: data });
  }

  async deleteUser(query) {
    return await this.#db.delete(query);
  }
};
