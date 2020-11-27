<template lang="pug">
.checkout-cart-preview
    h2 {{ $t('orderDetails.tiitle') }}

    .your-cart_items.your-cart_items-small
        .item(v-for="item, i in $store.state.cart.items" :key="i")
            span.image
                img(v-lazy-load :data-src="`/uploads/${image(item.product)}`")
            span.title {{ $toLocale(item.product, 'name', $i18n.locale) }} x {{ item.quantity }}
            span.total € {{ total(item.product.price, item.quantity) }} EUR

    apply-code
    .checkout-math
        .line.split-2
            span {{ $t('orderDetails.listSubtotal') }}
            span.total {{ totalCount  }} EUR
        .line.split-2(v-if="coupon")
            span {{ $t('checkout.couponListTitle') }}
            span.total -{{ couponDiscount }}%
        .line.split-2
            span {{ $t('orderDetails.listShipping') }}
            template(v-if="step === 3")
              span(v-if="!shipping") Free
              span(v-else-if="isOmniviaFree") Omnivia Free
              span(v-else) € {{ shipping }}.00 EUR
            template(v-else)
              span {{ $t('orderDetails.shippingStepDescription') }}
        .line.split-2.total
            span {{ $t('orderDetails.listTotal') }}
            template(v-if="step === 3")
              span.total.big {{  totalWithShipping }} EUR
            template(v-else)
              span.total.big {{ totalCountDiscount  }} EUR
</template>

<script>
import { mapGetters } from "vuex";
import applyCode from "./ApplyCode";

export default {
  props: ["shipping", "step"],
  name: "checkout-cart-preview",
  methods: {
    image(item) {
      return item.hasOwnProperty("images")
        ? item.images.split(",")[0]
        : "default.png";
    },
    total(price, qnt) {
      return (price * qnt).toFixed(2);
    }
  },
  computed: {
    isOmniviaFree() {
      return this.shipping === 3 ? +this.totalCountRaw >= 5000 : false;
    },
    totalWithShipping() {
      const sub = "€ ";
      const clearTotalCount = this.totalCountDiscount.replace(sub, "");

      if (this.isOmniviaFree) {
        return sub + parseFloat(clearTotalCount);
      }

      return sub + (parseFloat(clearTotalCount) + parseFloat(this.shipping));
    },
    ...mapGetters("cart", [
      "totalCount",
      "totalCountDiscount",
      "totalCountRaw",
      "coupon",
      "couponDiscount"
    ])
  },
  components: {
    applyCode
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/base/_variables";

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
