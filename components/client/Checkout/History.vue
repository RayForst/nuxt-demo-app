<template lang="pug">
nav
    nuxt-link.test(
        :to="localePath(item.link)"
        v-for="item in path"
        :key="item.key"
        :class="{ active: item.key === active, blocked: item.key > active }"
    ) {{ $t(item.name) }}
</template>

<script>
export default {
  name: "checkout-history",
  props: ["active"],
  data() {
    return {
      path: [
        {
          link: "/cart",
          key: 1,
          name: "checkout.history.cart"
        },
        {
          link: "/checkout/cart/information",
          key: 2,
          name: "checkout.history.information"
        },
        {
          link: "/checkout/cart/information/shipping",
          key: 3,
          name: "checkout.history.shipping"
        },
        {
          link: "/checkout/cart/information/shipping/payment",
          key: 4,
          name: "checkout.history.payment"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/base/_variables";
nav {
  padding-bottom: 24px;
  padding-top: 4px;
  display: none;

  @media #{$media_lg} {
    display: block;
  }

  .test {
    position: relative;
    font-family: Lora;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 18px;
    color: #000000;
    padding-right: 35px;
    text-decoration: none;
    padding-left: 30px;

    &:first-child {
      padding-left: 0;
    }

    &:after {
      content: "";
      height: 9px;
      width: 5px;
      background: url("/icons/history-arrow.svg");
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-4px);
    }

    &:last-child {
      &:after {
        content: none;
      }
    }

    &.active {
      text-transform: underline;
    }

    &.blocked {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
}
</style>
