const Models = require("../models");
const Model = Models.Article;
const Sequelize = require("sequelize");

const Op = Sequelize.Op;

async function index() {
  try {
    return await Model.findAll({
      raw: true,
      order: [["createdAt", "DESC"]],
      where: {
        show: 1
      }
    });
  } catch (err) {
    return {};
  }
}

async function recent() {
  try {
    return await Model.findAll({
      raw: true,
      order: [["createdAt", "DESC"]],
      limit: 3,
      where: {
        show: 1
      }
    });
  } catch (err) {
    return {};
  }
}

export { index, recent };
