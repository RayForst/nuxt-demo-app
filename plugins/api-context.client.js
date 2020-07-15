export default (context, inject) => {
  inject("api", async (reqMethod, controller, params) => {
    try {
      let uri = "/" + controller;

      return await context.$axios["$" + reqMethod](uri, params);
    } catch (e) {
      console.error(e);
      throw e;
    }
  });
};
