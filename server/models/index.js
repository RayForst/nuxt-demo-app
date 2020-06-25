const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const CONFIG = require("../../nuxt.config.js");
const DATABASE_CONFIG = CONFIG.server.sequelize;
let db = {};

const sequelize = new Sequelize(
  DATABASE_CONFIG.database,
  DATABASE_CONFIG.user,
  DATABASE_CONFIG.password,
  DATABASE_CONFIG.options
);

fs.readdirSync(__dirname)
  .filter(file => file !== "index.js")
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

db["ProductCategory"].hasMany(db["ProductSubcategory"], {
  foreignKey: "ProductCategoryId"
});
db["ProductSubcategory"].belongsTo(db["ProductCategory"], {
  foreignKey: "ProductCategoryId"
});

db["ProductSubcategory"].hasMany(db["Product"], {
  foreignKey: "ProductSubcategoryId"
});
db["Product"].belongsTo(db["ProductSubcategory"], {
  foreignKey: "ProductSubcategoryId"
});

db["ProductLine"].hasMany(db["Product"], {
  foreignKey: "ProductLineId"
});

db["Product"].belongsTo(db["ProductLine"], {
  foreignKey: "ProductLineId"
});

db["EventSubscribtion"].belongsTo(db["Event"], {
  foreignKey: "SubId"
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
