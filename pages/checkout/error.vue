<template lang="pug">
.container.content-container
    app-checkout-history(
        :active="3"
    )
    .checkout
        .successful
            img(v-lazy-load data-src="/icons/cart-success.svg" style="visibility:hidden;" width="71" height="78")
            h1 {{ $t('checkout.paymentFailTitle') }}
            h2(v-html="$t('checkout.paymentFailText')")
            nuxt-link(:to="localePath('/')").ui-button.ui-button--big.ui-button--full-green {{ $t('checkout.paymentFailButton') }}
</template>

<script>
import appCheckoutHistory from "@/components/client/Checkout/History";
import appOrderPreview from "@/components/client/Checkout/OrderPreview";
import appEnteredInfo from "@/components/client/Checkout/EnteredInfo";
import appShipping from "@/components/client/Checkout/Shipping";
import appBack from "@/components/client/Back";

export default {
  layout: "checkout",
  data() {
    return {};
  },
  methods: {
    async save(id) {
      const response = await this.$api("post", "contacts/checkoutfail", {
        id
      });
    }
  },
  components: {
    appShipping,
    appCheckoutHistory,
    appOrderPreview,
    appEnteredInfo,
    appBack
  },
  mounted() {
    this.save(this.$route.query.orderId);
  }
};
</script>

<style lang="scss" scoped>
.checkout {
  border-top: 1px solid #d6d9da;
  padding-bottom: 110px;

  h1 {
    font-family: Lora;
    font-style: normal;
    font-weight: normal;
    font-size: 32px;
    line-height: 41px;
    color: #000000;
  }
}
.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px 0;
}

.successful {
  text-align: center;
  padding: 60px 0;

  h1 {
    font-family: Montserrat;
    font-style: normal;
    font-weight: normal;
    font-size: 30px;
    line-height: 50px;
    /* identical to box height, or 167% */

    text-align: center;

    color: #000000;
  }

  h2 {
    margin-top: 15px;
    margin-bottom: 65px;
    font-family: Montserrat;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 1.3em;
    /* identical to box height, or 100% */

    text-align: center;

    color: #6f6f6f;
  }
}
</style>
