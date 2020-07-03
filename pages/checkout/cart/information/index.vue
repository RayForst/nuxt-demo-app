<template lang="pug">
.container.content-container
    app-checkout-history(
      :active="2"
    )
    .checkout
        app-order-preview
          template(v-slot:info)
            app-customer-information
          template(v-slot:details)
            app-shipping-address
            .controls
              app-back
              nuxt-link(:to="localePath(`/checkout/cart/information/shipping`)").ui-button.ui-button--big.ui-button--full-green Continue to shipping

</template>

<script>
import appCheckoutHistory from "@/components/client/Checkout/History";
import appOrderPreview from "@/components/client/Checkout/OrderPreview";
import appShippingAddress from "@/components/client/Checkout/ShippingAddress";
import appCustomerInformation from "@/components/client/Checkout/CustomerInformation";
import appBack from "@/components/client/Back";

export default {
  layout: "checkout",
  components: {
    appCheckoutHistory,
    appOrderPreview,
    appShippingAddress,
    appCustomerInformation,
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
