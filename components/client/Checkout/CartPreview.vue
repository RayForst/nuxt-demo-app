<template lang="pug">
.checkout-cart-preview
    h2 Your Order

    .your-cart_items.your-cart_items-small
        .item(v-for="item, i in $store.state.cart.items" :key="i")
            span.image
                img(:src="`/uploads/${image(item.product)}`")
            span.title {{ $toLocale(item.product, 'name', $i18n.locale) }} x {{ item.quantity }}
            span.total € {{ total(10, item.quantity) }}.00

    form.coupon
      input.ui-input(type="text" placeholder="Discount code")
      button.ui-button Apply
      p.coupon-desc Промокод спрашивайте у своего косметолога или следите за акциями на сайте.
    .checkout-math
        .line.split-2
            span subtotal
            span.total € {{ totalCount  }}.00 EUR
        .line.split-2
            span Shipping
            template(v-if="step === 3")
              span(v-if="!shipping") Free
              span(v-else) € {{ shipping }}.00 EUR
            template(v-else)
              span Calculated at next step
        .line.split-2.total
            span total
            template(v-if="step === 3")
              span.total.big € {{ totalCount + shipping }}.00 EUR
            template(v-else)
              span.total.big € {{ totalCount  }}.00 EUR
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: ["shipping", "step"],
  methods: {
    image(item) {
      return item.hasOwnProperty("images")
        ? item.images.split(",")[0]
        : "default.png";
    },
    total(price, qnt) {
      return parseFloat((price * qnt).toFixed(2));
    }
  },
  computed: {
    ...mapGetters("cart", ["totalCount"])
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/base/_variables";

form.coupon {
  margin-top: 30px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 11px;
  margin-bottom: 104px;

  input {
    background: #ffffff;
    border: 1px solid #e5e5e5;
    box-sizing: border-box;
    font-family: Montserrat;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 12px;
    color: #000000;
    padding: 0 20px;
    height: 41px;
  }
  p {
    font-family: Lora;
    font-style: normal;
    font-weight: normal;
    font-size: 10px;
    line-height: 15px;

    color: #969696;
  }

  @media #{$media_md} {
    grid-template-columns: 1fr 108px;
  }
}

.checkout-math {
  .line {
    text-align: left;
    padding-bottom: 15px;
    &:last-child {
      border-top: 1px solid #d6d9da;
      padding-top: 40px;
      margin-top: 20px;
      align-items: end;

      span {
        line-height: 28px !important;
      }
    }

    span {
      &:first-child {
        font-family: Lora;
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 15px;
        letter-spacing: 1px;
        text-transform: uppercase;

        color: #000000;
      }

      &:last-child {
        text-align: right;
      }
    }
  }

  .total {
    font-family: Montserrat;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 1.4em;

    &.big {
      font-size: 20px;
    }

    color: #000000;
  }
}

.image {
  transform: translateY(-15px);
  height: 80px;
  width: 80px;
  display: inline-flex;
  margin-right: 29px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.title {
  font-family: Lora;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 1.43em;
  color: #000000;
}

.item {
  display: grid;
  padding: 15px 0;
  border-bottom: 1px solid #d6d9da;
  padding: 45px 0 15px 0;
  grid-template-columns: 110px 2fr 1fr;
}

.total {
  text-align: right;
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 1.2em;
  color: #103324;
}

h2 {
  font-family: Lora;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 26px;
  color: #000000;
  margin-top: 0;
  margin-bottom: 0;
}
</style>
