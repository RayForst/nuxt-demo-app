<template lang="pug">
  .products
    .content-container.content
      .row
        .col-xs-12.col-lg-3
          app-products-menu(
            :slug="$route.params.slug"
            :lines="lines"
            :links="links"
          )
        .col-xs-12.col-lg-9
          nuxt-child
    app-callback
    app-subscribe
</template>

<script>
import appCallback from "@/components/client/CallMeBack/Index";
import appProductsMenu from "@/components/client/Products/Menu";
import appProducts from "@/components/client/Products/List";
import appSubscribe from "@/components/client/Subscribe";

export default {
  async asyncData({ app, $toLocale, params }) {
    try {
      let lines = await app.$api("get", "product-lines", {});
      let links = await app.$api("get", "categories/subcategories", {
        params: { category: params.slug }
      });

      const locale = app.i18n.locale;
      console.log(locale);
      let field = "name";
      if (locale !== "en") field += `_${locale}`;

      let alphabeticCompare = function(a, b) {
        return a[field].localeCompare(b[field]);
      };

      links = links.sort(alphabeticCompare);
      lines = lines.sort(alphabeticCompare);

      return { lines, links };
    } catch (err) {
      console.log(err.path, err.statusMessage);
    }
  },
  data() {
    return {
      onPage: 9,
      page: 0,
      description: null
    };
  },
  head() {
    return {
      title: "Products"
    };
  },
  components: {
    appCallback,
    appProductsMenu,
    appProducts,
    appSubscribe
  },
  beforeRouteUpdate(to, from, next) {
    console.log("WATCH");

    // created by lazy load issue fix
    document
      .querySelectorAll(".products .bg-image")
      .forEach(function(sandwich, index) {
        sandwich.style.backgroundImage = "none";
      });

    next();
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/base/_variables";

.category-line {
  width: 1px;
  margin: 0 auto;
  height: 100%;
  background: rgba(#324148, 0.2);
}

.products {
  position: relative;

  @media #{$media_lg} {
    padding-top: 20px;
  }
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
</style>
