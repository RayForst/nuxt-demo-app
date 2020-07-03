<template lang="pug">
  .products
    .content-container.content
      .row
        .col-xs-12.col-lg-3
          app-products-menu(
            :slug="slug"
            :lines="lines"
            :links="links"
          )
        .col-xs-12.col-lg-9
          h1 Prodcts {{ $route.params.slug }} {{ $route.params.subcategory }} {{ $route.params.line }}

          app-products(
            :products="products"
            :perPage="onPage"
            :page="page"
          )
    app-callback
</template>

<script>
import appCallback from "@/components/client/CallMeBack/Index";
import appProductsMenu from "@/components/client/Products/Menu";
import appProducts from "@/components/client/Products/List";

export default {
  async asyncData({ $axios, $toLocale, params }) {
    try {
      console.log("hello");
      let products = [];

      if (!params.line) {
        let request = params.subcategory
          ? {
              subcategory: params.subcategory
            }
          : {
              category: params.slug
            };

        console.log("params", params.subcategory, params.slug);
        console.log("request", request);

        products = await $axios.$get("/products", request);
        const desc = await $axios.$get("/products/description", request);
        console.log("description", desc);
        // const description = $toLocale(desc, "description");
      } else {
        if (params.line === "all") {
          products = await $axios.$get("/products", {
            category: params.slug
          });
        } else {
          products = await $axios.$get("/products/lines", {
            category: params.slug,
            line: params.line
          });
        }
      }

      let lines = await $axios.$get("/product-lines");
      let links = await $axios.$get("/categories/subcategories", {
        category: params.slug
      });

      // const locale = this.$i18n.locale;
      // let field = "name";
      // if (locale !== "en") field += `_${locale}`;

      // let alphabeticCompare = function(a, b) {
      //   return a[field].localeCompare(b[field]);
      // };

      // links = links.sort(alphabeticCompare);
      // lines = lines.sort(alphabeticCompare);

      return { lines, links, products };
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
  components: {
    appCallback,
    appProductsMenu,
    appProducts
  }
};
</script>
