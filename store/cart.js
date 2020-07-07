export const state = () => ({
  items: []
});

export const getters = {
  totalCount: state => {
    let total = 0;

    state.items.forEach(x => {
      total += parseFloat((10.45 * x.quantity).toFixed(2));
    });

    return parseFloat(total).toFixed(2);
  },
  totalQuantity: state => {
    let total = 0;

    state.items.forEach(x => {
      total += 1 * x.quantity;
    });

    return total;
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
        quantity: 1
      });
    }

    localStorage.setItem("cart", JSON.stringify(state.items));
  },
  delete(state, data) {
    console.log("delete data", data);
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
    state.items = JSON.parse(localStorage.getItem("cart"));
  }
};
