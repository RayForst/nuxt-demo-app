module.exports = {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href:
          "https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.css"
      },
      {
        rel: "stylesheet",
        href:
          "https://cdnjs.cloudflare.com/ajax/libs/flexboxgrid/6.3.1/flexboxgrid.css"
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: ["@/assets/scss/layout.scss"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: "~plugins/font-loader", mode: "client" },
    { src: "~plugins/slide", mode: "client" },
    { src: "~plugins/vue-tabs", mode: "client" },
    { src: "~plugins/notifications", mode: "client" },
    { src: "~plugins/google-maps", mode: "client" },
    { src: "~plugins/json-editor", mode: "client" },
    { src: "~plugins/owl-carousel", mode: "client" },
    { src: "~plugins/i18n.js" },
    { src: "~plugins/toLocale" }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    "@nuxtjs/axios",
    [
      "nuxt-i18n",
      {
        /* module options */
      }
    ]
  ],
  axios: {
    prefix: "/apii/"
  },
  i18n: {
    locales: [
      {
        code: "en",
        file: "en-US.js"
      },
      {
        code: "lv",
        file: "lv-LV.js"
      },
      {
        code: "ru",
        file: "ru-RU.js"
      }
    ],
    lazy: true,
    langDir: "lang/",
    defaultLocale: "lv",
    vueI18n: {
      fallbackLocale: "lv"
    }
  },
  server: {
    sequelize: {
      database: process.env.DB_NAME || "inbalance_dump",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASS || "1234",
      options: {
        dialect: "mysql",
        logging: false
      }
    }
  },
  serverMiddleware: [
    { path: "/apii", handler: require("body-parser").json() },
    {
      path: "/apii",
      handler: (req, res, next) => {
        const url = require("url");
        req.query = url.parse(req.url, true).query;
        req.params = { ...req.query, ...req.body };
        next();
      }
    },
    { path: "/apii", handler: "~/server/api-server.js" }
  ],
  router: {},
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};
