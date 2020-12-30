const Models = require("../models");
const Sequelize = require("sequelize");
const axios = require("axios");
const config = require("../../nuxt.config.js");
const Op = Sequelize.Op;
const ProductModel = Models.Product;
const CallMeBack = Models.CallMeBack;
const PartnershipRequest = Models.PartnershipRequest;
const Email = require("../services/sendEmail");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const html_to_pdf = require("html-pdf-node");
const options = {};
const Prices = require("../../services/Prices");
const PDF = require("../services/checkoutPDF");

async function save(req) {
  try {
    Email.send(
      "Call me back request!",
      `<div>Client Fullname: ${req.body.phone}</div>
      <div>Client Lang: ${req.body.userLang}</div>`
    );

    return await Models.ContactRequest.create(req.body);
  } catch (err) {
    return {};
  }
}

async function event(req) {
  try {
    Email.send(
      "Event subscription!",
      `<div>Client Fullname: ${req.body.firstname} ${req.body.lastname}</div>
        <div>Client Phone: ${req.body.phone}</div>
        <div>Client Email: ${req.body.email}</div>`
    );

    return await Models.EventSubscribtion.create(req.body);
  } catch (err) {
    return {};
  }
}

async function checkoutsuccess(req) {
  try {
    const checkoutRecord = await Models.Checkouts.findOne({
      where: { id: req.query.id, status: 0 }
    });

    if (!checkoutRecord) return;

    const checkoutDetails = JSON.parse(checkoutRecord.details);

    const productsFromDB = await ProductModel.findAll({
      where: {
        id: checkoutDetails.products.map(function(item) {
          return item.id;
        })
      }
    });

    // address
    let packageAddress = "";

    if (checkoutDetails.form.status !== "phiz") {
      packageAddress = checkoutDetails.jur_addr;
    } else {
      packageAddress = `${checkoutDetails.address_line_1} ${checkoutDetails.address_line_2}`;
    }

    const pdfPath = await createDocument(
      {
        customer: {
          first_name: checkoutDetails.first_name,
          last_name: checkoutDetails.last_name,
          addr: packageAddress
        },
        company: {
          name: checkoutDetails.company,
          registrationNumber: checkoutDetails.company_rn,
          taxNum: checkoutDetails.taxnum
        },
        products: checkoutDetails.products,
        coupon: checkoutDetails.coupon,
        shipping: checkoutDetails.shippingPrice
      },
      productsFromDB
    );

    Email.paymentEmail(pdfPath, checkoutDetails.email);

    productsFromDB.forEach(function(item, index) {
      let quantityItem = checkoutDetails.products.filter(obj => {
        return obj.id === item.id;
      });

      item.update({
        totalCount:
          item.totalCount - quantityItem[0].quantity < 0
            ? 0
            : item.totalCount - quantityItem[0].quantity
      });
    });

    checkoutRecord.update({
      status: 1
    });

    return true;
  } catch (err) {
    console.log(err);
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
    const record = await Models.Checkouts.create({ details, proceed: false });
    const recordId = record.dataValues.id;
    const clientEmail = req.body.email;
    const failureLink =
      "https://www.inbalans.lv/checkout/error?orderId=" + recordId;

    try {
      // GET TOTAL PRICE FROM DB
      const products = await ProductModel.findAll({
        where: {
          id: req.body.products.map(function(item) {
            return item.id;
          })
        }
      });

      let preparedProducts = products.map(function(item) {
        let quantityItem = req.body.products.filter(obj => {
          return obj.id === item.id;
        });

        return {
          quantity: quantityItem[0].quantity,
          price: item.price
        };
      });

      let total = Prices.calculate(
        preparedProducts,
        req.body.coupon,
        true,
        false,
        false,
        req.body.shippingPrice
      );

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

async function createDocument(userData, products) {
  let fileContent = { content: PDF.generate(userData, products) };

  const dirname = path.join(__dirname, "../pdf/");
  const randomFilename = crypto.randomBytes(20).toString("hex");

  const buffer = await html_to_pdf.generatePdf(fileContent, options);

  fs.writeFileSync(dirname + randomFilename + ".pdf", buffer);

  return dirname + randomFilename + ".pdf";
}

export {
  save,
  event,
  checkout,
  checkoutfail,
  checkoutsuccess,
  callmeback,
  partnership
};
