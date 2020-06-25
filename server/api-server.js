const log = require("./services/logger");

/**
 * Dinamic API Controller use
 */
export default async (req, res, next) => {
  let url = req._parsedUrl.pathname.replace(/^\/+|\/+$|\.+/g, "");
  url = url.split("/");

  let method;
  let controller;

  if (url.length < 3) {
    controller = url.pop();
    method = "index";
  } else {
    method = url.pop();
    controller = url.slice(1).join("/");
  }

  log("API", req._parsedUrl.pathname, `route requested`);

  try {
    /**
     * http://<server_name>/api/controller_name/method_name
     */
    let api = require("./controllers/" + controller);
    let result = await api[method](req.params);

    res.end(JSON.stringify(result));
  } catch (err) {
    console.log(err);
    res.sendStatus(404);
  }
};
