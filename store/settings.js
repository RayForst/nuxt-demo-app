export const state = () => ({
  settings: {}
});

export const mutations = {
  init(state, data) {
    state.settings = data;
    return state;
  }
};
