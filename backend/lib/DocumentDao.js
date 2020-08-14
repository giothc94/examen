"use strict";

const { MongoConnection } = require("./mongo");

module.exports.DocumentDao = class {
  #client;
  #db;
  constructor(collection) {
    this.#client = new MongoConnection();
    this.collection = collection;
  }

  async #connect() {
    this.#db = await this.#client.connect();
  }

  async get({ query = {}, fields = {} }) {
    await this.#connect();
    return await this.#db
      .collection(this.collection)
      .findOne(query, { projection: fields });
  }
  async getAll({ fields = {} }) {
    await this.#connect();
    return await this.#db
      .collection(this.collection)
      .find({})
      .project(fields)
      .toArray();
  }
  async create(data) {
    await this.#connect();
    let { insertedId } = await this.#db
      .collection(this.collection)
      .insertOne(data);
    return { insertedId };
  }
  async update(query, data) {
    await this.#connect();
    return await this.#db
      .collection(this.collection)
      .updateOne(query, data, { upsert: true });
  }
  async delete(query) {
    let { deletedCount } = await this.#db
      .collection(this.collection)
      .deleteOne(query);
    return { deletedId: deletedCount === 1 ? query._id : null };
  }
};
