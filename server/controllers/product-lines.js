const Models = require("../models");
const Model = Models.ProductLine;

async function index() {
  try {
    return await Model.findAll({
      raw: true,
      order: [["createdAt", "DESC"]]
    });
  } catch (err) {
    return {};
  }
}

export { index };
