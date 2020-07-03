const Models = require("../models");
const Model = Models.Product;
const Sequelize = require("sequelize");

const Op = Sequelize.Op;

async function index(req) {
  try {
    return await Model.findOne({
      where: {
        slug: req.query.slug,
        "$ProductSubcategory.id$": {
          [Op.ne]: null
        },
        show: 1
      },
      include: [
        {
          model: Models.ProductSubcategory,
          attributes: ["name", "name_lv", "name_ru", "slug"],
          include: [
            {
              model: Models.ProductCategory,
              attributes: ["id", "slug"]
            }
          ]
        }
      ]
    });
  } catch (err) {
    return {};
  }
}

export { index };
