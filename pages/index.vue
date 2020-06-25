<template lang="pug">
.container.content-container
  app-hero(
    v-if="heroEvents.length > 0"
    :events="heroEvents"
  )

  nav
    nuxt-link(:to="localePath('/products/category')")
      | Products
    nuxt-link(:to="localePath('/products/category/subcategory')")
      | Products with subcategory
    nuxt-link(:to="localePath('/products/category/lines/linename')")
      | Products with line
    nuxt-link(:to="localePath('/product/test')")
      | Products - single
    nuxt-link(:to="localePath('/articles')")
      | Articles
    nuxt-link(:to="localePath('/articles/test')")
      | Articles - single
    nuxt-link(:to="localePath('/events')")
      | Events
    nuxt-link(:to="localePath('/events/test')")
      | Event - single
    nuxt-link(:to="localePath('/static/test')")
      | Static page
    nuxt-link(:to="localePath('/contacts')")
      | Contacts
    nuxt-link(:to="localePath('/wellness-products')")
      | Wellness products
    nuxt-link(:to="localePath('/wellness-procedures')")
      | Wellness procedures
    nuxt-link(:to="localePath('/checkout/cart')")
      | Checkout - cart
    nuxt-link(:to="localePath('/checkout/information')")
      | Checkout - information
    nuxt-link(:to="localePath('/checkout/payment')")
      | Checkout - payment
    nuxt-link(:to="localePath('/allpages')")
      | NEW pages
</template>

<script>
import appHero from "@/components/client/Hero";

export default {
  async asyncData({ $axios }) {
    try {
      const heroEvents = await $axios.$get("/events/hero");
      return { heroEvents };
    } catch (err) {
      console.log(err.path, err.statusMessage);
    }
  },
  data() {
    return {
      heroEvents: []
    };
  },
  components: {
    appHero
  }
};
</script>

<style lang="scss" coped>
nav {
  a {
    display: block;
    margin: 10px 0;
  }
}
</style>
