"use strict";

const MongoClient = require("mongodb").MongoClient;
const { config } = require("../config/index");
const debug = require("debug")("backend:mongo-db");

module.exports.MongoConnection = class {
  #client;

  constructor() {}

  connect = () =>
    new Promise((resolve, reject) => {
      if (!this.#client) {
        MongoClient.connect(config.mongoUrl, (err, client) => {
          if (err) reject(err);
          this.#client = client.db(config.mongoDatabase);
          debug("Connected with mongo");
          resolve(this.#client);
        });
      } else {
        debug("Reconnected with mongo");
        resolve(this.#client);
      }
    });
};
