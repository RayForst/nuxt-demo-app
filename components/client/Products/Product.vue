<template lang="pug">
  .product(
      @click="$router.push(localePath(`/product/${content.slug}`))")
    .image-wrap.scale-container
      .scale-image.bg-image(
        :style="{ backgroundImage: 'url(/uploads/' + image + ')' }"
      )
    .vertical-container 
      .name {{ $toLocale(content, 'name', $i18n.locale) }}
      .desc {{ $toLocale(content, 'ProductSubcategory.name', $i18n.locale) }}
    nuxt-link(:to="localePath(`/product/${content.slug}`)").ui-button {{ $t('links.discover') }}
</template>

<script>
export default {
  props: ["content"],
  name: "product",
  data() {
    return {};
  },
  computed: {
    image() {
      return this.content.hasOwnProperty("images")
        ? this.content.images.split(",")[0]
        : "default.png";
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/base/_variables";

.ui-button {
  box-sizing: border-box;
  width: 100%;
}

.product {
  max-width: 280px;
  margin: auto;
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-bottom: 40px;
  height: 100%;
  box-sizing: border-box;
  cursor: pointer;

  @media #{$media_sm} {
    padding-left: 32px;
    padding-right: 32px;
    max-width: 350px;
  }

  @media #{$media_lg} {
    padding: 0;
    padding-bottom: 50px;
  }

  .ui-button {
    margin-top: auto;
  }
}

.name {
  font-family: "Lora", sans-serif;
  font-size: 20px;
  line-height: 1.33em;
  margin-bottom: 10px;
}

.desc {
  line-height: 1.63;
  font-weight: 300;
  font-size: 16px;
  color: var(--c_gray);
}

.image-wrap {
  box-shadow: -1px 13px 20px 0 rgba(197, 197, 197, 0.31);
  background-image: url("https://cdn.shopify.com/s/files/1/1068/2502/products/aloe-infusion-single-bottles-9oz-front-white_a55f74b6-753c-4ab1-8d9b-0aef6dbbe9e0.jpg?v=1508692828");
  display: flex;
  position: relative;
  width: 100%;

  &:before {
    content: "";
    display: block;
    padding-top: 100%;
    background: #fff;
  }
}

.scale-container {
  position: relative;
  overflow: hidden;

  &:hover {
    .scale-image {
      transform: translate(-50%, -50%) scale(1.15, 1.15);
    }
  }
}

.scale-image {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.6s ease;
}
</style>
