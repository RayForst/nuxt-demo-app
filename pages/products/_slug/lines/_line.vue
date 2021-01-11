<template lang="pug">
    div 
        template(v-if="products.length")
            app-products(
                :products="products"
                :perPage="onPage"
                :page="page"
            )
        template(v-else)
            h2 {{ $t('other.emptyProductList') }}
        .container.px-0-lg
            .row
              .col-xs-12
                app-pagination(
                  :total="products.length" 
                  :perPage="onPage" 
                  :current="page"
                  @newpage="changePage"
                )
</template>

<script>
import appProducts from "@/components/client/Products/List";
import appPagination from "@/components/client/Pagination";

export default {
  async asyncData({ app, $toLocale, params }) {
    try {
      let products = [];

      if (params.line === "all") {
        products = await app.$api("get", "products", {
          params: { category: params.slug }
        });
      } else {
        products = await app.$api("get", "products/lines", {
          params: {
            category: params.slug,
            line: params.line
          }
        });
      }

      return { products };
    } catch (err) {
      console.log(err.path, err.statusMessage);
    }
  },
  data() {
    return {
      onPage: 9,
      page: 0,
      products: []
    };
  },
  components: {
    appProducts,
    appPagination
  },
  methods: {
    changePage(event) {
      this.page = event;
    }
  },
  mounted() {
    const page = this.$route.query.page;

    if (page) {
      this.page = page - 1;
    }
  }
};
</script>
