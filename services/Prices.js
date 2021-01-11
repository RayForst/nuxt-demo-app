import currency from "currency.js";

const PVN = 21;
const COUPON = 10;
const EUR = function(value) {
  return currency(value, { symbol: "€ ", separator: " ", decimal: "." });
};

function getPercent(percent, total) {
  return ((percent / 100) * total).toFixed(2);
}

function processIntVal(val) {
  val = val.toString();
  return val.slice(0, val.length - 2) + "." + val.slice(-2);
}

export function calculate(
  products,
  coupon = false,
  raw = false,
  withoutPVN = false,
  pvnOnly = false,
  shipping = false,
  couponOnly = false
) {
  let total = EUR(0);

  products.forEach(function(product) {
    total = total.add(EUR(product.price).multiply(product.quantity));
  });

  if (pvnOnly) {
    return EUR(getPercent(PVN, processIntVal(total.intValue))).format();
  }

  if (withoutPVN) {
    let subValue = EUR(getPercent(PVN, processIntVal(total.intValue)));
    total = total.subtract(subValue);
  }

  if (coupon) {
    let subValue = EUR(getPercent(COUPON, processIntVal(total.intValue)));

    console.log("TOTAL ", total.intValue, "COUPON ", subValue.intValue);
    if (couponOnly) {
      return subValue.format();
    }

    total = total.subtract(subValue);
  }

  if (shipping) {
    if (shipping === 5) {
      total = total.add(EUR("5"));
    }

    if (shipping === 3 && total.intValue < 5000) {
      total = total.add(EUR("3"));
    }
  }

  if (raw) {
    return total.intValue;
  }

  return total.format();
}

export function shipping(price, grandTotal) {
  let total = EUR(0);

  if (price === 5) {
    total = total.add(EUR("5"));
  }

  if (price === 3 && grandTotal.intValue < 5000) {
    total = total.add(EUR("3"));
  }

  return total.format();
}

export function format(price, withoutPVN = false) {
  let total = EUR(price);

  if (withoutPVN) {
    let subValue = EUR(getPercent(PVN, processIntVal(total.intValue)));
    return total.subtract(subValue);
  }

  return total.format();
}
