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
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    [
      "nuxt-i18n",
      {
        /* module options */
      }
    ]
  ],
  i18n: {
    locales: ["en", "lv", "ru"],
    defaultLocale: "lv",
    vueI18n: {
      fallbackLocale: "lv",
      messages: {
        en: {
          welcome: "Welcome!",
          pages: {
            contacts: {
              title: "Want to contact us?"
            }
          }
        },
        lv: {
          welcome: "Labdien!",
          pages: {
            contacts: {
              title: "Vēlaties sazināties?"
            }
          }
        },
        ru: {
          welcome: "Приветик!",
          pages: {
            contacts: {
              title: "Хотите связаться с нами?"
            }
          }
        }
      }
    }
  },
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
