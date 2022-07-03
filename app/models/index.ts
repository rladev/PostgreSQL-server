// const dbConfig = require("../config/db.config");
import { dbConfig } from '../config/db.config'
import { notesModel } from './notes.model';

import { Sequelize } from "sequelize";
const sequelize = new Sequelize("testdb", "postgres", "1", {
  host: "localhost",
  port: 5432,
  dialect: "postgres",
  // operatorsAliases: 0,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

// interface db {
//     sequelize: any,
//     Sequelize: any,
//     notes: any
// };

const db = {
    Sequelize : Sequelize,
    sequelize : sequelize,
    notes : notesModel(sequelize, Sequelize) //table name
} 
// db.Sequelize = Sequelize;
// db.sequelize = sequelize;


// db.notes = require("./notes.model.js")(sequelize, Sequelize);

export { db }
