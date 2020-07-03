<template lang="pug">
  #app.sticky-footer-container.layout
    app-header
    app-burger
    .router-view-container
      transition(name="fade" mode="out-in")
        nuxt
    app-footer
</template>

<script>
import appHeader from "@/components/client/Header";
import appBurger from "@/components/client/Burger/Index";
import appFooter from "@/components/client/Footer";

export default {
  transition: {
    name: "fade",
    mode: "out-in"
  },
  components: {
    appHeader,
    appBurger,
    appFooter
  },
  mounted() {
    this.$store.commit("cart/init", true);
  }
};
</script>

<style lang="scss"></style>
