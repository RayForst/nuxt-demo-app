<template lang="pug">
  div.static
    section.hero
      div.bg-image.hero-main.bg-hero(
        :lazy-background="image"
      )
        .content-container.content
          .row.center-xs.start-lg
            .col-xs-11.col-lg-10.text-start
              h1 {{ $toLocale(item, "name", $i18n.locale) }}
    .content-container.content
      div
        .container
          p(
            v-html="$toLocale(item, 'text', $i18n.locale)"
          )
          .spacer
        
        .container(v-if='showPartnerForm')
          app-partnership-form
      app-products(:heading="$t('reccomendProducts')" :products="products")
      .spacer
      .spacer
    app-subscribe
</template>

<script>
import appPartnershipForm from "@/components/client/Partnership/Index";
import appProducts from "@/components/client/Products/ListPreview";
import appSubscribe from "@/components/client/Subscribe";

export default {
  async asyncData({ $axios, params }) {
    try {
      let showPartnerForm = false;

      const item = await $axios.$get("/static", {
        params: {
          slug: params.slug
        }
      });

      item.text = item.text.split("&lt;").join("<");
      item.text = item.text.split("&gt;").join(">");

      const productCategory = await $axios.$get("/settings/priority");
      const products = await $axios.$get("/products/priority", {
        params: {
          category: productCategory[0].priorityOnMain
        }
      });

      if (
        params.slug === "become-a-partner" ||
        params.slug === "become-a-partner-skin-regimen"
      ) {
        showPartnerForm = true;
      }

      return { item, products, showPartnerForm };
    } catch (err) {
      console.log(err.path, err.statusMessage);
    }
  },
  computed: {
    image() {
      return `/uploads/${this.item.image}`;
    }
  },
  components: {
    appProducts,
    appSubscribe,
    appPartnershipForm
  },
  data() {
    return {
      showPartnerForm: false,
      products: [],
      item: {
        image: ""
      }
    };
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/base/_variables";

h1 {
  font-size: 32px;
  line-height: 1.29em;
  font-weight: normal;
  color: #ffffff;
  margin-bottom: 40px;

  @media #{$media_lg} {
    font-size: 36px;
  }
}

.bg-hero {
  background-image: url("/images/banner2.jpg");
  opacity: 0;
}

.image-wrap {
  box-shadow: -1px 13px 20px 0 rgba(197, 197, 197, 0.31);
  background-image: url("https://cdn.shopify.com/s/files/1/1068/2502/products/Shadow-Aloe-Infusion-9oz_d3ec928d-c570-4b86-afb9-f8f985547468.jpg");
  display: flex;
  background-color: var(--c_primary);

  &:before {
    content: "";
    display: block;
    padding-top: 100%;
    background: #fff;
  }
}

p {
  font-size: 18px;
  font-weight: 300;
  line-height: 1.43em;
  color: #000000;

  &.padding-right {
    padding-right: 30px;
  }

  &.padding-left {
    padding-left: 30px;
  }

  &.gray {
    color: #7e8f97;
  }
}
</style>
