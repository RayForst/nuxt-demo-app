export const state = () => ({
  counter: 0
});

export const mutations = {
  increment(state) {
    state.counter++;
  }
};

export const actions = {
  async nuxtServerInit({ commit, dispatch }, { req }) {
    await dispatch("storeDispatchFunc");
  },
  async storeDispatchFunc({ commit }) {
    const res = await this.$axios.get("settings");
    const menu = await this.$axios.get("menu");
    const cat = await this.$axios.get("categories");

    commit("settings/init", res.data[0]);
    commit("menu/init", menu.data);
    commit("menu/initCatrgories", cat.data);
  }
};
