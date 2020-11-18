module.exports = {
  mode: "universal",
  telemetry: false,
  head: {
    titleTemplate: "%s | Inbalans",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      },
      { name: "msapplication-TileColor", content: "#ffffff" },
      { name: "theme-color", content: "#ffffff" }
    ],
    link: [
      { rel: "icon", href: "/favicon.ico" },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png"
      },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "mask-icon", color: "#2c541e", href: "/safari-pinned-tab.svg" },
      {
        rel: "stylesheet",
        href:
          "https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.css"
      },
      {
        rel: "stylesheet",
        href:
          "https://cdnjs.cloudflare.com/ajax/libs/flexboxgrid/6.3.1/flexboxgrid.css"
      },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Lora&family=Montserrat:wght@300;400;500;600;700&display=swap"
      }
    ]
  },
  loading: { color: "#fff" },
  css: ["@/assets/scss/layout.scss"],
  plugins: [
    { src: "~plugins/slide", mode: "client" },
    { src: "~plugins/vue-tabs", mode: "client" },
    { src: "~plugins/notifications", mode: "client" },
    { src: "~plugins/google-maps", mode: "client" },
    { src: "~plugins/json-editor", mode: "client" },
    { src: "~plugins/owl-carousel", mode: "client" },
    { src: "~plugins/validation", mode: "client" },
    { src: "~/plugins/api-context.client.js", mode: "client" },
    { src: "~/plugins/api-context.server.js", mode: "server" },
    { src: "~/plugins/readmore.js", mode: "client" },
    { src: "~/plugins/masonry.js", mode: "client" },
    { src: "~plugins/i18n.js" },
    { src: "~plugins/toLocale" }
  ],
  buildModules: [],
  modules: ["@nuxtjs/axios", "nuxt-lazy-load", ["nuxt-i18n", {}]],
  axios: {
    prefix: "/apii/",
    browserBaseUrl: "http://127.0.0.1:280/apii/",
    port: 280
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
        warnings: false,
        logging: false,
        dialectOptions: {
          useUTC: false // for reading from database
        },
        define: {
          charset: "utf8",
          dialectOptions: { collate: "utf8_general_ci" }
        },
        timezone: "+03:00"
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
  router: {
    extendRoutes(routes, resolve) {
      // routes.push({
      //   name: "custom",
      //   path: "/products/:slug/:subcategory",
      //   component: resolve(__dirname, "pages/products/_slug/index.vue")
      // });
      // routes.push({
      //   name: "custom2",
      //   path: "/products/:slug/lines/:line",
      //   component: resolve(__dirname, "pages/products/_slug/index.vue")
      // });
    }
  },
  build: {
    extend(config, ctx) {}
  },
  payment: {
    brandId: "",
    secretKey: ""
  }
};
