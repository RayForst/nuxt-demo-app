const Models = require("../models");
const Model = Models.Article;
const Sequelize = require("sequelize");
const axios = require("axios");
const config = require("../../nuxt.config.js");
const Model2 = Models.Product;

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

export { index };
