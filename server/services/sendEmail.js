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
      Esam saņēmuši Jūsu pasūtījumu! Drīzumā sazināsimies ar Jums pēc norādītā tālruņa numura, lai apstiprinātu pasūtījumu un vienotos par produktu saņemšanu. 
      Parasti sazināmies 12 stundu laikā, bet līdz ar to, ka janvārī mums ir saīsināts darba laiks, atzvanīsim divu dienu laikā.
    \n
      Ar vislabākiem novēlējumiem,
    \n
      inbalans
    \n
      Tālr. +371 22 182 188\n
      Facebook: @inbalans.riga\n
      Instagram: @inbalans.riga / @comfort_zone_latvija / @skin_regimen_latvija\n
      www.inbalans.lv
    `;

    const emailContentHtml = `
    Sveicināti!
    <br/>
    <br/>
    Esam saņēmuši Jūsu pasūtījumu! Drīzumā sazināsimies ar Jums pēc norādītā tālruņa numura, lai apstiprinātu pasūtījumu un vienotos par produktu saņemšanu. 
    Parasti sazināmies 12 stundu laikā, bet līdz ar to, ka janvārī mums ir saīsināts darba laiks, atzvanīsim divu dienu laikā.
    <br/>
    <br/>
    Ar vislabākiem novēlējumiem,
    <br/>
    <br/>
    inbalans
    <br/>
    <br/>
    Tālr. +371 22 182 188<br/>
    Facebook: @inbalans.riga<br/>
    Instagram: @inbalans.riga / @comfort_zone_latvija / @skin_regimen_latvija<br/>
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
