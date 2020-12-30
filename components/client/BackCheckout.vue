<template lang="pug">
  .row.center-xs  
    .col-xs-10.col-lg-12
      a.back(@click.prevent="goBack" href="/")
        img(
          v-lazy-load data-src="/icons/arrow.svg"
        )
        | {{ $t('back') }}
</template>

<script>
export default {
  name: "back-link",
  methods: {
    goBack() {
      this.$emit("back", true);
      window.scrollTo(0, 0);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/base/_variables";

.back {
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 1.1px;
  text-transform: uppercase;
  color: #7e8f97;
  font-family: "Lora", sans-serif;
  display: flex;
  padding-top: 5px;
  padding-bottom: 20px;
  transition: opacity 0.3s ease;
  text-decoration: none;

  &:hover {
    opacity: 0.7;
  }

  img {
    margin-right: 17px;
  }
}
</style>
