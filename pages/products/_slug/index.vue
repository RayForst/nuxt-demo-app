<template lang="pug">
    div 
        template(v-if="products.length")
            .product-desc.container.px-0-lg(v-if="description")
                read-more(
                    :more-str="$t('readmore.open')" 
                    :text="description" 
                    link="#" 
                    :less-str="$t('readmore.close')" 
                    :max-chars="280"
                )
            app-products(
                :products="products"
                :perPage="onPage"
                :page="page"
            )
        template(v-else)
            h2  {{ $t('other.emptyProductList') }}
        .container.px-0-lg
            .row
              .col-xs-12.pag-wrap
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
      let description = null;

      products = await app.$api("get", "products", {
        params: {
          category: params.slug
        }
      });

      const desc = await app.$api("get", "products/description", {
        params: {
          category: params.slug
        }
      });
      description = app.$toLocale(desc[0], "description", app.i18n.locale);

      return { products, description };
    } catch (err) {
      console.log(err.path, err.statusMessage);
    }
  },
  data() {
    return {
      onPage: 9,
      page: 0,
      products: [],
      description: null
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

<style lang="scss" scoped>
@import "~@/assets/scss/base/_variables";

.pag-wrap .pagination {
  padding-top: 0;

  @media #{$media_md} {
    padding-top: 50px;
  }
}
</style>
