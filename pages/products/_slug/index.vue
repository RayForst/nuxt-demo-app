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
            h2 No products in this category
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
      description = app.$toLocale(desc[0], "description");

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
  }
};
</script>
