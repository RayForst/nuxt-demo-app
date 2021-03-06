<template lang="pug">
  .product(
    @click="$router.push(localePath(`/product/${content.slug}`))"
    :class="{ newProduct: content.isNew }"
  )
    .image-wrap.scale-container
      .scale-image.bg-image(
        :lazy-background="`/uploads/${image}`"
      )
    .vertical-container 
      .name {{ $toLocale(content, 'name', $i18n.locale) }}
      .desc {{ $toLocale(content, 'ProductSubcategory.name', $i18n.locale) }}
      .price {{ price }}
    template(v-if="!added")
      a(@click.stop.prevent="addToCart").ui-button {{ $t('cart.addButton') }}
    template(v-else)
      button.added.ui-button.ui-button--full-green(disabled="disabled") {{ $t('cart.addButtonDone') }}
</template>

<script>
export default {
  props: ["content"],
  name: "product",
  data() {
    return {
      added: false
    };
  },
  methods: {
    addToCart() {
      this.added = true;
      this.$store.commit("cart/add", {
        product: this.content,
        qnt: 1
      });
    }
  },
  computed: {
    image() {
      return this.content.hasOwnProperty("images")
        ? this.content.images.split(",")[0]
        : "default.png";
    },
    price() {
      return `€ ${this.content.price} EUR`;
    },
    isNewProduct() {
      return Math.random() >= 0.5;
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
  position: relative;

  &.newProduct {
    &:after {
      content: "New";
      background: #db6a6a;
      border-radius: 100px;
      width: 50px;
      height: 50px;
      position: absolute;
      top: 15px;
      right: 15px;
      font-weight: 500;
      font-size: 12px;
      line-height: 10px;
      letter-spacing: 2px;
      color: #ffffff;
      text-align: center;
      line-height: 50px;
      text-transform: uppercase;
    }
  }

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

    font-size: 9px;

    @media #{$media_sm} {
      font-size: 12px;
    }
  }

  .vertical-container {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
}

.name {
  font-family: "Lora", sans-serif;
  font-size: 15px;
  line-height: 1.33em;
  margin-bottom: 10px;

  @media #{$media_sm} {
    font-size: 20px;
  }
}

.desc {
  line-height: 1.63;
  font-weight: 300;
  font-size: 14px;
  color: var(--c_gray);

  @media #{$media_sm} {
    font-size: 16px;
  }
}

.price {
  font-size: 14px;
  line-height: 1.63em;
  margin-top: 10px;
  color: #103324;
  margin-top: auto;
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

  .bg-image {
    opacity: 0;
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
