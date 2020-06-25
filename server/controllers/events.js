const Models = require("../models");
const Model = Models.Event;

async function hero() {
  try {
    return await Model.findAll({
      raw: true,
      // uncomment 
      //   where: Sequelize.and({ priority: 1, show: 1 }),
      order: [["dateStart", "DESC"]]
    });
  } catch (err) {
    return {};
  }
}

export { hero };
