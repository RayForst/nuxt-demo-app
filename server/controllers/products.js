const Models = require("../models");
const Model = Models.Product;
const Sequelize = require("sequelize");

const Op = Sequelize.Op;

async function index(req) {
  try {
    let result;

    if (req.query.category) {
      result = await Model.findAll({
        raw: true,
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: Models.ProductSubcategory,
            attributes: ["name", "name_lv", "name_ru"],
            include: [
              {
                model: Models.ProductCategory,
                attributes: ["name", "name_lv", "name_ru"]
              }
            ]
          }
        ],
        where: {
          "$ProductSubcategory.ProductCategory.slug$": req.query.category,
          "$ProductSubcategory.id$": {
            [Op.ne]: null
          },
          show: 1
        }
      });
    } else if (req.query.subcategory) {
      result = await Model.findAll({
        raw: true,
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: Models.ProductSubcategory,
            attributes: ["name", "name_lv", "name_ru"]
          }
        ],
        where: {
          "$ProductSubcategory.slug$": req.query.subcategory,
          "$ProductSubcategory.id$": {
            [Op.ne]: null
          },
          show: 1
        }
      });
    } else {
      result = await Model.findAll({
        raw: true,
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: Models.ProductSubcategory,
            attributes: ["name", "name_lv", "name_ru"]
          }
        ],
        where: {
          "$ProductSubcategory.id$": {
            [Op.ne]: null
          },
          show: 1
        }
      });
    }

    return result;
  } catch (err) {
    return {};
  }
}

async function priority(req) {
  try {
    return await Model.findAll({
      raw: true,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: Models.ProductSubcategory,
          attributes: ["name", "name_lv", "name_ru"],
          include: [
            {
              model: Models.ProductCategory,
              attributes: ["name", "name_lv", "name_ru"]
            }
          ]
        }
      ],
      where: {
        "$ProductSubcategory.ProductCategory.id$": req.query.category,
        "$ProductSubcategory.id$": {
          [Op.ne]: null
        },
        priority: 1,
        show: 1
      }
    });
  } catch (err) {
    return {};
  }
}

async function lines(req) {
  try {
    return await Model.findAll({
      raw: true,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: Models.ProductSubcategory,
          attributes: ["name", "name_lv", "name_ru"],
          include: [
            {
              model: Models.ProductCategory,
              attributes: ["name", "name_lv", "name_ru"]
            }
          ]
        },
        {
          model: Models.ProductLine,
          attributes: ["slug"]
        }
      ],
      where: {
        "$ProductSubcategory.ProductCategory.slug$": req.query.category,
        "$ProductLine.slug$": req.query.line,
        "$ProductSubcategory.id$": {
          [Op.ne]: null
        },
        show: 1
      }
    });
  } catch (err) {
    return {};
  }
}

async function description(req) {
  try {
    let result;

    if (req.query.category) {
      result = await Models.ProductCategory.findAll({
        raw: true,
        where: {
          slug: req.query.category
        }
      });
    } else {
      result = await Models.ProductSubcategory.findAll({
        raw: true,
        where: {
          slug: req.query.subcategory
        }
      });
    }

    return result;
  } catch (err) {
    return {};
  }
}

export { index, lines, priority, description };
