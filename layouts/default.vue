<template lang="pug">
  #app.sticky-footer-container.layout
    app-header
    app-burger
    transition(name="fade" mode="out-in")
      .router-view-container
        nuxt
    app-footer
</template>

<script>
import appHeader from "@/components/client/Header";
import appBurger from "@/components/client/Burger/Index";
import appFooter from "@/components/client/Footer";

export default {
  components: {
    appHeader,
    appBurger,
    appFooter
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/layout-default.scss";
</style>
