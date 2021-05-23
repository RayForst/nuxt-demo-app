const nodemailer = require("nodemailer");
const sgTransport = require("nodemailer-sendgrid-transport");
const CONFIG = require("../../nuxt.config.js");
const Models = require("../models");
const { payment } = require("../../nuxt.config.js");

module.exports = {
  async send(subject, html) {
    var options = {
      auth: {
        api_key: CONFIG.smtp.token
      }
    };

    var transporter = nodemailer.createTransport(sgTransport(options));

    const settings = await Models.Settings.findAll({
      limit: 1,
      order: [["createdAt", "DESC"]],
      raw: true
    });

    const email = {
      from: "Inbalans",
      to: settings[0].contactFormEmail,
      subject,
      text: `Text from ${subject} form`,
      html: `<h1>Text from contact form</h1>
            ${html}`
    };

    transporter.sendMail(email, error => {
      if (error) console.log(error);
      else console.log("Mail send Successfuly");
      transporter.close();
    });
  },

  async paymentEmail(filepath, clientEmail) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: CONFIG.smtp.auth
    });

    const settings = await Models.Settings.findAll({
      limit: 1,
      order: [["createdAt", "DESC"]],
      raw: true
    });

    const emailContent = `
      Sveicināti!
    \n
      Pateicamies par Jūsu pasūtījumu. Drīzumā piezavnīsim, lai to apstiprinātu. Esam darba režīmā no pirmdienas līdz ceturtdienai no 10.00 līdz 17.00. Droši rakstiet, ja ir jautājumi 🌷
    \n
      Lai skaista diena,
    \n
      inbalans
    \n
      Tālr. +371 22 182 188\n
      Instagram: @inbalans.riga / @comfortzoneskin_latvia\n
      Facebook: @inbalans.riga\n
      www.inbalans.lv
    `;

    const emailContentHtml = `
    Sveicināti!
    <br/>
    <br/>
    Pateicamies par Jūsu pasūtījumu. Drīzumā piezavnīsim, lai to apstiprinātu. Esam darba režīmā no pirmdienas līdz ceturtdienai no 10.00 līdz 17.00. Droši rakstiet, ja ir jautājumi 🌷
    <br/>
    <br/>
    Lai skaista diena,
    <br/>
    <br/>
    Jūsu inbalans
    <br/>
    <br/>
    Tālr. +371 22 182 188<br/>
    Instagram: @inbalans.riga / @comfortzoneskin_latvia<br/>
    Facebook: @inbalans.riga<br/>
    www.inbalans.lv
  `;

    const email = {
      from: "Inbalans",
      to: clientEmail,
      cc: "inbalans.riga@gmail.com",
      subject: "Paldies par pasūtījumu!",
      text: emailContent,
      html: emailContentHtml,
      attachments: [
        {
          filename: "ticket.pdf",
          path: filepath,
          contentType: "application/pdf"
        }
      ]
    };

    transporter.sendMail(email, error => {
      if (error) console.log(error);
      else console.log("Mail send Successfuly");
      transporter.close();
    });
  }
};
