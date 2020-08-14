require("dotenv").config();

module.exports.config = {
  mongoUrl: process.env.MONGO_URL,
  mongoDatabase: process.env.MONGO_DATABASE,
  mongoCollectionUsuarios: process.env.MONGO_COLLECTION_USUARIOS,
};
