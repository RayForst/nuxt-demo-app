const Models = require("../models");
const Sequelize = require("sequelize");

const Op = Sequelize.Op;

async function save(req) {
  try {
    return await Models.ContactRequest.create(req.body);
  } catch (err) {
    return {};
  }
}

export { save };
