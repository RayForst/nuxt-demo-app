const Models = require("../models");
const Sequelize = require("sequelize");
const axios = require("axios");
const config = require("../../nuxt.config.js");
const Op = Sequelize.Op;
import currency from "currency.js";
const ProductModel = Models.Product;
const CallMeBack = Models.CallMeBack;
const PartnershipRequest = Models.PartnershipRequest;
const Email = require("../services/sendEmail");

async function save(req) {
  try {
    return await Models.ContactRequest.create(req.body);
  } catch (err) {
    return {};
  }
}

async function checkoutsuccess(req) {
  try {
    let alreadyExists = await Models.Checkouts.findOne({
      where: { id: req.query.id, status: 0 }
    });

    alreadyExists.update({
      status: 1
    });

    return true;
  } catch (err) {
    return false;
  }
}

async function checkoutfail(req) {
  try {
    let alreadyExists = await Models.Checkouts.findOne({
      where: { id: req.body.id, status: 0 }
    });

    alreadyExists.update({
      status: 2
    });

    return true;
  } catch (err) {
    return false;
  }
}

async function checkout(req) {
  try {
    const details = JSON.stringify(req.body);

    var productIds = [];

    req.body.products.forEach(function(item) {
      productIds.push(item.id);
    });

    const record = await Models.Checkouts.create({ details, proceed: false });
    const recordId = record.dataValues.id;
    const clientEmail = req.body.email;
    const failureLink =
      "https://www.inbalans.lv/checkout/error?orderId=" + recordId;
    let totalPrice = 0;

    try {
      // GET TOTAL PRICE FROM DB
      const products = await ProductModel.findAll({
        where: {
          id: productIds
        }
      });

      let euro = function(value) {
        return currency(value, { symbol: " ", separator: " ", decimal: " " });
      };
      let total = euro(0);

      products.forEach(function(item) {
        productIds.push(item.id);
        let quantityItem = req.body.products.filter(obj => {
          return obj.id === item.id;
        });

        let quantity = quantityItem[0].quantity;

        total = total.add(euro(item.dataValues.price).multiply(quantity));
      });
      // DISCOUNT
      if (req.body.coupon != "") {
        let pretotalDis = total
          .format()
          .replace(/ /g, "")
          .slice(0, -2);

        var numVal2 = 20 / 100;
        var totalValue = pretotalDis - pretotalDis * numVal2;
        totalValue = totalValue.toFixed(0);

        total = euro(totalValue);
      }

      // SHIPPING

      let pretotal = total
        .format()
        .replace(/ /g, "")
        .slice(0, -2);

      if (req.body.shippingPrice === 5) {
        total = total.add(euro("500"));
      }

      if (req.body.shippingPrice === 3 && +pretotal < 5000) {
        total = total.add(euro("300"));
      }

      total = total
        .format()
        .replace(/ /g, "")
        .slice(0, -2);

      // SEND REQUEST TO BANK
      const resp = await axios({
        method: "post",
        url: "https://portal.klix.app/api/v1/purchases/",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + config.payment.secretKey,
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
          "Content-Type": "application/json",
          Host: "portal.klix.app",
          "accept-encoding": "gzip, deflate",
          "cache-control": "no-cache"
        },
        data: {
          success_callback:
            "https://www.inbalans.lv/apii/contacts/checkoutsuccess?id=" +
            recordId,
          success_redirect: "https://www.inbalans.lv/checkout/success",
          failure_redirect: failureLink,
          cancel_redirect: "https://www.inbalans.lv/",
          purchase: {
            language: "lv",
            products: [
              {
                price: total,
                name: "Website purchase ID" + recordId
              }
            ]
          },
          client: {
            email: clientEmail
          },
          brand_id: config.payment.brandId,
          reference: recordId
        }
      });

      return resp.data.checkout_url;
    } catch (err) {
      // Handle Error Here
      console.error(err);
      return failureLink;
    }
  } catch (err) {
    console.log(err);
    return "/";
  }
}

async function callmeback(req) {
  try {
    await Models.CallMeBack.create(req.body);

    Email.send(
      "Call me back request!",
      `<div>Client Fullname: ${req.body.phone}</div>
      <div>Client Lang: ${req.body.userLang}</div>`
    );

    return true;
  } catch (err) {
    return {};
  }
}

async function partnership(req) {
  try {
    const event = await PartnershipRequest.create(req.body);

    Email.send(
      "Partnership request!",
      `<div>Client Fullname: ${req.body.firstname} ${req.body.lastname}</div>
                <div>Client Email: ${req.body.email}</div>
                <div>Client Phone: ${req.body.phone}</div>`
    );

    return true;
  } catch (err) {
    return {};
  }
}

export {
  save,
  checkout,
  checkoutfail,
  checkoutsuccess,
  callmeback,
  partnership
};
