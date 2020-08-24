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

async function checkout(req) {
  try {
    const details = JSON.stringify(req.body);

    console.log(details);

    return await Models.Checkouts.create({ details, proceed: false });
  } catch (err) {
    console.log(err);
    return {};
  }
}

export { save, checkout };
