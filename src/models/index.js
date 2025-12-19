'use strict';
import dotenv from 'dotenv';
dotenv.config();

import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import { fileURLToPath, pathToFileURL  } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const env = process.env.NODE_ENV || 'development';
import configFile from '../config/config.json' assert { type: 'json' };
const config = configFile[env];

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

const files = fs.readdirSync(__dirname).filter(file =>
  file !== path.basename(__filename) && file.endsWith('.js')
);

for (const file of files) {
  const fileUrl = pathToFileURL(path.join(__dirname, file)).href;
  const modelModule = await import(fileUrl);
  const model = modelModule.default(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
}

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
