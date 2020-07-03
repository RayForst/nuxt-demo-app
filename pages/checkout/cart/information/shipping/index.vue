<template lang="pug">
.container.content-container
    app-checkout-history(
        :active="3"
    )
    .checkout
        app-order-preview
            template(v-slot:info)
                app-entered-info(
                    :records="records"
                )
            template(v-slot:details)
                app-shipping
                .controls
                    app-back
                    nuxt-link(:to="localePath(`/checkout/cart/information/shipping/payment`)").ui-button.ui-button--big.ui-button--full-green Continue to Payment
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
    return {
      records: [
        { title: "Contact", value: "trafimaf@gmail.com" },
        {
          title: "Ship to",
          value: "Lašplses 64, 190, Valmiera AK 995201, Latvia"
        }
      ]
    };
  },
  components: {
    appShipping,
    appCheckoutHistory,
    appOrderPreview,
    appEnteredInfo,
    appBack
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
</style>
