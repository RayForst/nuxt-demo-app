<template lang="pug">
 .home
  .content-container.content
    app-hero(
      v-if="heroEvents.length > 0"
      :events="heroEvents"
      :titleTag="heroTitleTag"
    )
    app-products(:heading="productsHeading" :caption="productsCaption" :products="products")
    .spacer
    app-recent-posts(:heading="postsHeading" :articles="recentArticles")
  .spacer
  app-subscribe
</template>

<script>
import appHero from "@/components/client/Events/Hero";
import appProducts from "@/components/client/Products/ListPreview";
import appRecentPosts from "@/components/client/Articles/Preview";
import appSubscribe from "@/components/client/Subscribe";

export default {
  async asyncData({ app }) {
    try {
      const heroEvents = await app.$api("get", "events/hero");
      const productCategory = await app.$api("get", "settings/priority");
      const products = await app.$api("get", "products/priority", {
        params: {
          category: productCategory[0].priorityOnMain
        }
      });

      const displayCategory = products[0];
      const recentArticles = await app.$api("get", "articles/recent");

      return { heroEvents, products, displayCategory, recentArticles };
    } catch (err) {
      console.log(err.path, err.statusMessage);
    }
  },
  data() {
    return {
      heroEvents: [],
      products: [],
      displayCategory: {},
      heroTitleTag: "h1"
    };
  },
  computed: {
    productsHeading() {
      return (
        this.$t("events.bestsellers.title") +
        " " +
        `<b>${this.$toLocale(
          this.displayCategory,
          "ProductSubcategory.ProductCategory.name",
          this.$i18n.locale
        )}</b>`
      );
    },
    productsCaption() {
      return this.$t("events.bestsellers.caption");
    },
    postsHeading() {
      return this.$t("articles.recent");
    }
  },
  components: {
    appHero,
    appProducts,
    appRecentPosts,
    appSubscribe
  }
};
</script>

<style lang="scss" scoped>
nav {
  a {
    display: block;
    margin: 10px 0;
  }
}
</style>
