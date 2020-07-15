const Models = require("../models");
const Model = Models.StaticPage;
const Sequelize = require("sequelize");

const Op = Sequelize.Op;

async function index(req) {
  try {
    return await Model.findOne({
      where: {
        slug: req.query.slug,
        show: 1
      }
    });
  } catch (err) {
    return {};
  }
}

async function menu(req) {
  try {
    return await Model.findAll({
      raw: true,
      order: [["createdAt", "DESC"]],
      attributes: [
        "id",
        "name",
        "name_lv",
        "name_ru",
        "slug",
        "image",
        "menupos"
      ],
      where: {
        show: 1
      }
    });
  } catch (err) {
    return {};
  }
}

export { index, menu };
