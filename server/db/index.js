import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';

/**
 * Load all models in the current `models` directory.
 */

const config = require('../config.json')[process.env.NODE_ENV ? process.env.NODE_ENV.toLowerCase() : 'dev'];
const sequelize = new Sequelize(config.database, config.username, config.password, config);
var db = {};

// load all the models in the `models` directory
fs
  .readdirSync(path.join(__dirname, 'models'))
  .filter(file => file.indexOf('.') !== 0)
  .forEach(file => {
    let model = sequelize.import(path.join(__dirname, 'models', file));
    db[model.name] = model;
  });

// create the associations between db models
Object.keys(db).forEach(modelName => {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

// include sequelize references
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
