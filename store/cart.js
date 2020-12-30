import { calculate } from "@/services/Prices";

export const state = () => ({
  items: [],
  coupon: "",
  couponDiscount: 20
});

function prepareItems(items) {
  return items.map(product => {
    return {
      price: product.product.price,
      quantity: product.quantity
    };
  });
}

export const getters = {
  totalCount: state => {
    return calculate(prepareItems(state.items));
  },
  totalCountDiscount: state => {
    return calculate(prepareItems(state.items), state.coupon != "");
  },
  totalCountRaw: state => {
    return calculate(prepareItems(state.items), state.coupon != "", true);
  },
  totalQuantity: state => {
    return state.items.reduce((acc, x) => {
      return acc + 1 * x.quantity;
    }, 0);
  },
  getProductsIds: state => {
    return state.items.map(x => {
      return {
        id: x.product.id,
        quantity: x.quantity
      };
    });
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
