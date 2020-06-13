<template lang="pug">
  .language-change
    nuxt-link(:to="switchLocalePath('en')") English
    nuxt-link(:to="switchLocalePath('lv')") Latviski
    nuxt-link(:to="switchLocalePath('ru')") Русский
</template>

<script>
export default {
  name: "language-change"
};
</script>

<style lang="scss" scoped>
.language-change {
  background: #84add826;
  padding: 10px 20px;
  border: 1px solid #7993ce;

  a {
    margin: 0 10px;
  }
}
</style>
