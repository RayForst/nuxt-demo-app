const Models = require("../models");
const Model = Models.Event;

async function index() {
  try {
    return await Model.findAll({
      raw: true,
      order: [["dateStart", "DESC"]]
    });
  } catch (err) {
    return {};
  }
}

async function hero() {
  try {
    return await Model.findAll({
      raw: true,
      // where: Sequelize.and({ priority: 1, show: 1 }),
      order: [["dateStart", "DESC"]]
    });
  } catch (err) {
    return {};
  }
}

export { index, hero };
