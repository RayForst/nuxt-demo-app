<template lang="pug">
.grid-container
  .checkout-details
    app-checkout-cart-preview(
      :shipping="shipping"
      :step="step"
    )
  .checkout-info
    slot
</template>

<script>
import appCheckoutCartPreview from "./CartPreview";

export default {
  name: "checkout-order-preview",
  props: ["shipping", "step"],
  components: {
    appCheckoutCartPreview
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/base/_variables";

.grid-container {
  display: grid;
  grid-template-columns: 1fr;

  @media #{$media_md} {
    grid-template-columns: 1fr 1fr;
    gap: 1px 1px;
  }
}

.checkout-info {
  grid-area: 1 / 1 / 2 / 2;
  padding: 20px 0;

  @media #{$media_md} {
    padding: 0;
    grid-area: 1 / 1 / 2 / 2;
    padding-top: 40px;
    padding-right: 45px;
    padding-bottom: 48px;
  }
}

.checkout-details {
  grid-area: 2 / 1 / 3 / 2;
  padding: 20px 0;

  @media #{$media_md} {
    padding: 0;

    grid-area: 1 / 2 / 3 / 3;
    background: #fafafa;
    padding: 40px 68px;
  }
}

.checkout-request {
  grid-area: 3 / 1 / 4 / 2;
  padding: 20px 0;

  @media #{$media_md} {
    padding: 0;

    grid-area: 2 / 1 / 3 / 2;
    padding-right: 45px;
  }
}
</style>
