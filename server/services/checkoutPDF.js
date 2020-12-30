const Prices = require("../../services/Prices");
const moment = require("moment");

module.exports = {
  generate: function(userData, products) {
    let recipient = `${userData.customer.first_name} ${userData.customer.last_name}`;

    if (userData.company.name)
      recipient = `${userData.company.name}, ${recipient}`;

    let companyRn = userData.company.registrationNumber;
    let companyRnTitle = companyRn ? "Reģ. Nr" : "";

    let taxNum = userData.company.taxNum;
    let taxNumTitle = taxNum ? "PVN reģ. #" : "";

    let productsHtml = "";
    let preparedProducts = [];

    products.forEach(function(item, index) {
      let quantityItem = userData.products.filter(obj => {
        return obj.id === item.id;
      });

      let productObj = {
        price: item.price,
        quantity: quantityItem[0].quantity
      };

      preparedProducts.push(productObj);

      productsHtml += `<tr>
          <td>${index + 1}</td>
          <td>${item.id}</td>
          <td>${item.name}</td>
          <td>gab</td>
          <td>21%</td>
          <td>${productObj.quantity}</td>
          <td class="textr">${Prices.format(item.price, true)}</td>
          <td class="textr">${Prices.calculate(
            [productObj],
            false,
            false,
            true
          )}</td>
        </tr>
        `;
    });

    // PVN

    let withoutPVN = Prices.calculate(preparedProducts, false, false, true);
    let grandTotalPVN = Prices.calculate(
      preparedProducts,
      false,
      false,
      true,
      true
    );
    let shipping = Prices.shipping(
      userData.shipping,
      Prices.calculate(preparedProducts, userData.coupon, true)
    );
    let grandTotal = Prices.calculate(
      preparedProducts,
      userData.coupon,
      false,
      false,
      false,
      userData.shipping
    );

    // ADDRESS

    let discount = "";
    if (userData.coupon) {
      discount = ` <tr>
          <td>Atlaide:</td>
          <td class="textr">-${Prices.calculate(
            preparedProducts,
            userData.coupon,
            false,
            false,
            false,
            userData.shipping,
            true
          )}</td>
        </tr>`;
    }

    return `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Document</title>
            <style>
              .document {
                width: 1000px;
              }
              .heading {
                text-align: center;
              }
              .addr {
                  padding: 10px 0;
              }
              table {
                  width: 96%;
                  margin: 2%;
              }
              .textr {
                text-align: right;
              }
              .calc td:nth-child(4) {
                text-align: center;
              }
              .calc td:nth-child(5) {
                text-align: center;
              }
              .calc td:nth-child(6) {
                text-align: center;
              }

              .addr tr td:first-child {
                width: 168px;
                }

                .addr tr td:nth-child(2) {
                    width: 376px;
                    }
                .addr tr td:nth-child(3) {
                    width: 114px;
                    }
            </style>
          </head>
          <body>
            <div class="document">
              <div class="heading">
                <h1>Pavadzīme Nr. ${moment().format(
                  "L"
                )}/${userData.customer.last_name.toUpperCase()}</h1>
              </div>
        
              <table class="addr">
                <tbody>
                  <tr>
                    <td>Piegādātājs:</td>
                    <td>SIA INBALANS</td>
                    <td>Reģ. Nr.</td>
                    <td>50103945051</td>
                  </tr>
                  <tr>
                    <td>Adrese:</td>
                    <td>Jūrmala, Meža prospekts 49, LV-2010</td>
                    <td>PVN reģ. #</td>
                    <td>LV50103945051</td>
                  </tr>
                  <tr>
                    <td>Norēķinu rekvizīti:</td>
                    <td>AS Rietumu banka</td>
                    <td>N/konts</td>
                    <td>LV09RTMB0000605801393</td>
                  </tr>
                </thead>
              </table>
        
              <table class="addr">
                <tbody>
                  <tr>
                    <td>Saņēmējs:</td>
                    <td>${recipient}</td>
                    <td>${companyRnTitle}</td>
                    <td>${companyRn}</td>
                  </tr>
                  <tr>
                    <td>Piegādes adrese:</td>
                    <td>${userData.customer.addr}</td>
                    <td>${taxNumTitle}</td>
                    <td>${taxNum}</td>
                  </tr>
                </tbody>
              </table>
            
              <table class="calc">
                  <thead>
                      <tr>
                        <td>
                              <b>Nr.</b>
                        </td>
                        <td>
                            <b>Preces kods.</b>
                        </td>
                        <td>
                            <b>Preces nosaukums</b>
                        </td>
                        <td>
                            <b>Mērv.</b>
                        </td>
                        <td>
                            <b>PVN likme</b>
                        </td>
                        <td>
                            <b>Daudz.</b>
                        </td>
                        <td class="textr">
                            <b>Cena,<br/> EUR</b>
                        </td>
                        <td class="textr">
                            <b>Summa,<br/> EUR</b>
                        </td>
                      </tr>
                  </thead>
                  <tbody>
                      ${productsHtml}
                  </tbody>
              </table>
        
              <table class="total">
                  <tr>
                    <td>
                      <b>
                        Kopā:
                      </b>
                    </td>
                    <td class="textr">
                      <b>
                        ${withoutPVN}
                      </b>
                    </td>
                  </tr>
                  <tr>
                      <td>Pievienotās vērtības nodoklis 21% no summas  EUR:</td>
                      <td class="textr">${grandTotalPVN}</td>
                  </tr>
                  ${discount}
                  <tr>
                    <td>Piegāde:</td>
                    <td class="textr">${shipping}</td>
                  </tr>
                  <tr>
                      <td>
                        <b>
                          Kopējā summa:
                        </b>
                      </td>
                      <td class="textr"><b>
                          ${grandTotal}
                      </b></td>
                  </tr>
              </table>
            </div>
          </body>
        </html>
        `;
  }
};
