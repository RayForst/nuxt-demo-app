export const state = () => ({});

export const mutations = {};

export const actions = {
  async nuxtServerInit({ commit, dispatch }, { req }) {
    await dispatch("storeDispatchFunc");
  },
  async storeDispatchFunc({ commit }) {
    commit("settings/init", await this.app.$api("get", "settings"));
    commit("menu/init", await this.app.$api("get", "menu"));
    commit("menu/initCatrgories", await this.app.$api("get", "categories"));
  }
};
