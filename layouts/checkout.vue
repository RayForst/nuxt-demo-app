<template lang="pug">
  #app.sticky-footer-container.layout
    app-header
    .router-view-container
      transition(name="fade" mode="out-in")
        nuxt
    app-footer
</template>

<script>
import appHeader from "@/components/client/Header";
import appFooter from "@/components/client/Footer";

export default {
  components: {
    appHeader,
    appFooter
  },
  mounted() {
    this.$store.commit("cart/init", true);
  }
};
</script>

<style lang="scss"></style>
