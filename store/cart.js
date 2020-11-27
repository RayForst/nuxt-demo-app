import currency from "currency.js";

export const state = () => ({
  items: [],
  coupon: "",
  couponDiscount: 20
});

export const getters = {
  totalCount: (state, getters) => {
    let euro = value =>
      currency(value, { symbol: "€ ", separator: " ", decimal: "." });
    let total = euro(0);

    state.items.forEach(x => {
      total = total.add(euro(x.product.price).multiply(x.quantity));
    });

    return total.format();
  },
  totalCountDiscount: (state, getters) => {
    let euro = value =>
      currency(value, { symbol: "€ ", separator: " ", decimal: "." });
    let total = euro(0);

    state.items.forEach(x => {
      total = total.add(euro(x.product.price).multiply(x.quantity));
    });

    if (state.coupon) {
      var num = +total.format().replace(/€ /g, "");
      var totalValue = num - num * (state.couponDiscount / 100);
      totalValue = totalValue.toFixed(2);
      return "€ " + totalValue;
    }
    return total.format();
  },
  totalCountRaw: state => {
    let euro = value =>
      currency(value, { symbol: " ", separator: " ", decimal: " " });
    let total = euro(0);

    state.items.forEach(x => {
      total = total.add(euro(x.product.price).multiply(x.quantity));
    });

    if (state.coupon) {
      var num = +total
        .format()
        .replace(/ /g, "")
        .slice(0, -2);

      var totalValue = num - num * (state.couponDiscount / 100);
      totalValue = totalValue.toFixed(0);

      return +totalValue;
    }

    return total
      .format()
      .replace(/ /g, "")
      .slice(0, -2);
  },
  totalQuantity: state => {
    let total = 0;

    state.items.forEach(x => {
      total += 1 * x.quantity;
    });

    return total;
  },
  getProductsIds: state => {
    let result = [];

    state.items.forEach(x => {
      result.push({
        id: x.product.id,
        quantity: x.quantity
      });
    });

    // let total = 0;

    // state.items.forEach(x => {
    //   total += 1 * x.quantity;
    // });

    return result;
  },
  coupon(state) {
    return state.coupon;
  },
  couponDiscount(state) {
    return state.couponDiscount;
  }
};

export const mutations = {
  add(state, data) {
    const existIndex = state.items.findIndex(
      x => x.product.id === data.product.id
    );

    if (existIndex >= 0) {
      state.items[existIndex].quantity = data.qnt;
    } else {
      state.items.push({
        product: data.product,
        quantity: data.qnt
      });
    }

    localStorage.setItem("cart", JSON.stringify(state.items));
  },
  delete(state, data) {
    const existIndex = state.items.findIndex(x => x.product.id === data.id);

    if (existIndex >= 0) {
      state.items.splice(existIndex, 1);
    }

    localStorage.setItem("cart", JSON.stringify(state.items));
  },
  init(state, data) {
    if (process.server) {
      return;
    }

    const itemsInLocalStorage = JSON.parse(localStorage.getItem("cart"));
    if (!itemsInLocalStorage) return;

    state.items = itemsInLocalStorage;
  },
  clear(state) {
    state.items = [];
    localStorage.setItem("cart", JSON.stringify(state.items));
  },
  addCoupon(state, payload) {
    state.coupon = payload;
  },
  clearCoupon(state, payload) {
    state.coupon = "";
  }
};
