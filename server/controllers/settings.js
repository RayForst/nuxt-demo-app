const Models = require("../models");
const Model = Models.Settings;
const Sequelize = require("sequelize");

const Op = Sequelize.Op;

async function index() {
  try {
    return await Model.findAll({
      raw: true
    });
  } catch (err) {
    return {};
  }
}

export { index };
