const Models = require("../models");
const Model = Models.ProductCategory;
const SubcategoryModel = Models.ProductSubcategory;

async function index() {
  try {
    return await Model.findAll({
      raw: true,
      order: [["createdAt", "ASC"]]
    });
  } catch (err) {
    return {};
  }
}

async function subcategories(req) {
  try {
    if (req.query.category) {
      return await SubcategoryModel.findAll({
        raw: true,
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: Model,
            attributes: ["name", "name_lv", "name_ru"]
          }
        ],
        where: {
          "$ProductCategory.slug$": req.query.category
        }
      });
    }

    return await SubcategoryModel.findAll({
      raw: true,
      order: [
        [Model, "name", "ASC"],
        ["createdAt", "ASC"]
      ],
      include: [
        {
          model: Model,
          attributes: ["name"]
        }
      ]
    });
  } catch (err) {
    return {};
  }
}

export { index, subcategories };
