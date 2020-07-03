<template lang="pug">
.product
    .content-container.content.border-bottom
      app-back
      app-product-preview(:product="product")
    .border-top(
      v-if="products.length" 
    )
      .content-container.content
        app-products(:heading="$t('reccomendProducts')" :products="products")
    app-callback
</template>

<script>
import appBack from "@/components/client/Back";
import appProductPreview from "@/components/client/Products/Preview.vue";
import appProducts from "@/components/client/Products/ListPreview";
import appCallback from "@/components/client/CallMeBack/Index";

export default {
  async asyncData({ $axios, params }) {
    try {
      const product = await $axios.$get("/product", {
        params: {
          slug: params.slug
        }
      });

      console.log(product);

      const relatedProducts = await $axios.$get("/products/priority", {
        params: {
          category: product.ProductSubcategory.ProductCategory.id
        }
      });

      return { product, products: relatedProducts };
    } catch (err) {
      console.log(err.path, err.statusMessage);
    }
  },
  data() {
    return {
      products: []
    };
  },
  components: {
    appBack,
    appProducts,
    appProductPreview,
    appCallback
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/base/_variables";

.product {
  text-align: left;
  margin-bottom: 50px;
  margin-top: 20px;

  @media #{$media_md} {
    margin-top: 40px;
  }

  @media #{$media_lg} {
    margin-top: 0;
  }
}

.border-bottom {
  border-bottom: 1px solid rgba(50, 65, 72, 0.2);
}
</style>
