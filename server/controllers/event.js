const Models = require("../models");
const Model = Models.Event;
const Sequelize = require("sequelize");

const Op = Sequelize.Op;

async function index(req) {
  try {
    return await Model.findOne({
      where: {
        slug: req.query.slug
        // show: 1
      }
    });
  } catch (err) {
    return {};
  }
}

export { index };
