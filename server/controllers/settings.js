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

async function coupon(req) {
  try {
    console.log(req.query);
    if (req.query.code) {
      const item = await Model.findOne({
        raw: true,
        order: [["createdAt", "DESC"]]
      });

      return item.couponCodes.includes(req.query.code);
    } else {
      return false;
    }
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

export { index, coupon, priority };
