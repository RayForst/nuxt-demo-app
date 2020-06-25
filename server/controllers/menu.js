const Models = require("../models");
const Model = Models.StaticPage;

async function index() {
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

export { index };
