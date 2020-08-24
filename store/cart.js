import currency from "currency.js";

export const state = () => ({
  items: []
});

export const getters = {
  totalCount: state => {
    let euro = value =>
      currency(value, { symbol: "€ ", separator: " ", decimal: "." });
    let total = euro(0);

    state.items.forEach(x => {
      total = total.add(euro(x.product.price).multiply(x.quantity));
    });

    return total.format();
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
    console.log("CLEARING");
    state.items = [];
    localStorage.setItem("cart", JSON.stringify(state.items));
  }
};
