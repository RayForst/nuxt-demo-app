export const state = () => ({
  coupon: ""
});

export const getters = {
  coupon(state) {
    return state.coupon;
  }
};

export const mutations = {
  addCoupon(state, payload) {
    state.coupon = payload;
  },
  clear(state, payload) {
    state.coupon = "";
  }
};

export const actions = {
  clear({ commit }) {
    commit("checkout/clear");
  }
};
