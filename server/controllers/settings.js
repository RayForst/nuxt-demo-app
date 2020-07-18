const Models = require("../models");
const Model = Models.Settings;
const Sequelize = require("sequelize");

const Op = Sequelize.Op;

async function index() {
  try {
    return await Model.findOne({
      raw: true,
      order: [["createdAt", "DESC"]]
    });
  } catch (err) {
    return {};
  }
}

async function priority() {
  try {
    return await Models.Priority.findAll({
      raw: true,
      where: { id: 1 }
    });
  } catch (err) {
    return {};
  }
}

export { index, priority };
