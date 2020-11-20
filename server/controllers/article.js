const Models = require("../models");
const Model = Models.Article;
const Sequelize = require("sequelize");
const axios = require("pdfkit");

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

function test(req) {
  return "hello";
}

export { index, test };
