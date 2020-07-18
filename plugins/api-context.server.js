export default (context, inject) => {
  inject("api", async (method, controller, params) => {
    try {
      if (method === "get") {
        params = {
          query:
            params && params.hasOwnProperty("params") ? params.params : null
        };
      }
      const action =
        controller.split("/").length < 2 ? "index" : controller.split("/")[1];

      controller =
        controller.split("/").length < 2
          ? controller
          : controller.split("/")[0];

      let api = require(`../server/controllers/${controller.replace(
        /^\/+|\/+$|\.+/g,
        ""
      )}`);
      return await api[action](params);
    } catch (e) {
      console.error(e);
      throw e;
    }
  });
};
